import { ApiError, api } from './api';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  sendEmailVerification as firebaseSendEmailVerification,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  craft?: string;
  role: 'user' | 'creator';
}

export interface SignUpData {
  id?: string; // Firebase UID (optional as backend may use token)
  email?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface SignInData {
  id?: string; // Firebase UID (optional as backend may use token)
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
}

const isUnexpectedPropertyError = (error: ApiError) =>
  error.message.toLowerCase().includes('property') &&
  error.message.toLowerCase().includes('should not exist');

const shouldCreateBackendProfile = (error: unknown) =>
  error instanceof ApiError &&
  [400, 404, 409].includes(error.status) &&
  !isUnexpectedPropertyError(error);

const syncBackendProfile = async (): Promise<UserProfile> => {
  try {
    return await api.post<UserProfile>('/users/signin', {});
  } catch (signInError) {
    if (!shouldCreateBackendProfile(signInError)) {
      throw signInError;
    }

    return api.post<UserProfile>('/users/signup', {});
  }
};

const isMissingEndpointError = (error: unknown) =>
  error instanceof ApiError &&
  error.status === 404 &&
  typeof error.message === 'string' &&
  error.message.toLowerCase().includes('cannot post');

const throwOtpUnsupportedError = (error: unknown): never => {
  if (isMissingEndpointError(error)) {
    throw new Error(
      'Email code verification is not available on the hosted API yet. Please use Google sign-in while the backend team adds the OTP endpoints.'
    );
  }

  throw error;
};

export const authService = {
  // Firebase Auth Methods
  register: async (email: string, password: string): Promise<UserProfile> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send verification email
    try {
      await firebaseSendEmailVerification(user);
    } catch (error) {
      console.error("Failed to send verification email", error);
    }

    // Register in our backend
    return api.post<UserProfile>('/users/signup', {});
  },

  login: async (email: string, password: string): Promise<UserProfile> => {
    await signInWithEmailAndPassword(auth, email, password);
    
    return syncBackendProfile();
  },

  loginWithGoogle: async (): Promise<UserProfile> => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    return syncBackendProfile();
  },

  loginWithApple: async (): Promise<UserProfile> => {
    const provider = new OAuthProvider('apple.com');
    await signInWithPopup(auth, provider);

    return syncBackendProfile();
  },

  logout: async (): Promise<void> => {
    await firebaseSignOut(auth);
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('userData');
  },

  sendEmailOtp: async (email: string): Promise<void> => {
    try {
      return await api.post('/v1/auth/otp/send', { email });
    } catch (error) {
      return throwOtpUnsupportedError(error);
    }
  },

  verifyEmailOtp: async (email: string, code: string): Promise<void> => {
    try {
      return await api.post('/v1/auth/otp/verify', { email, code });
    } catch (error) {
      return throwOtpUnsupportedError(error);
    }
  },

  sendPasswordResetEmail: async (email: string): Promise<void> => {
    const { sendPasswordResetEmail: firebaseSendPasswordResetEmail } = await import('firebase/auth');
    await firebaseSendPasswordResetEmail(auth, email);
  },

  confirmPasswordReset: async (code: string, newPassword: string): Promise<void> => {
    await firebaseConfirmPasswordReset(auth, code, newPassword);
  },

  sendEmailVerification: async (): Promise<void> => {
    if (auth.currentUser) {
      await firebaseSendEmailVerification(auth.currentUser);
    }
  },

  // Phone Auth
  setupRecaptcha: (containerId: string): RecaptchaVerifier => {
    return new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
    });
  },

  sendOtp: async (phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  },

  // Backend API Methods
  signUp: async (_data: SignUpData = {}): Promise<UserProfile> => {
    return api.post<UserProfile>('/users/signup', {});
  },

  signIn: async (_data: SignInData = {}): Promise<UserProfile> => {
    return api.post<UserProfile>('/users/signin', {});
  },

  getMe: async (): Promise<UserProfile> => {
    try {
      return await api.get<UserProfile>('/auth/me');
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return api.get<UserProfile>('/users/me');
      }
      throw error;
    }
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      return await api.put<UserProfile>('/auth/me', data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return api.put<UserProfile>('/users/me', data);
      }
      throw error;
    }
  },
};
