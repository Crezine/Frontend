import { api } from './api';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
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
  id: string; // Firebase UID
  email: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface SignInData {
  id: string; // Firebase UID
}

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
    return api.post<UserProfile>('/users/signup', {
      id: user.uid,
      email: user.email!,
    });
  },

  login: async (email: string, password: string): Promise<UserProfile> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Sync with our backend
    return api.post<UserProfile>('/users/signin', {
      id: user.uid,
    });
  },

  loginWithGoogle: async (): Promise<UserProfile> => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user exists or create new in backend
    try {
      return await api.post<UserProfile>('/users/signin', { id: user.uid });
    } catch (error) {
      // If signin fails, try signup
      return await api.post<UserProfile>('/users/signup', {
        id: user.uid,
        email: user.email!,
        displayName: user.displayName || undefined,
        avatarUrl: user.photoURL || undefined
      });
    }
  },

  logout: async (): Promise<void> => {
    await firebaseSignOut(auth);
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('userData');
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
  signUp: async (data: SignUpData): Promise<UserProfile> => {
    return api.post<UserProfile>('/users/signup', data);
  },

  signIn: async (data: SignInData): Promise<UserProfile> => {
    return api.post<UserProfile>('/users/signin', data);
  },

  getMe: async (): Promise<UserProfile> => {
    return api.get<UserProfile>('/auth/me');
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    return api.put<UserProfile>('/auth/me', data);
  },
};
