import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService, UserProfile } from '../../services/authService';
import { api, ApiError } from '../../services/api';
import * as firebaseAuth from 'firebase/auth';
import { auth } from '../../services/firebase';

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual<typeof import('firebase/auth')>('firebase/auth');
  class MockGoogleAuthProvider {
    providerId = 'google.com';
  }
  class MockOAuthProvider {
    providerId: string;
    constructor(providerId: string) {
      this.providerId = providerId;
    }
  }
  class MockRecaptchaVerifier {
    auth: any;
    containerId: string;
    options: any;
    constructor(auth: any, containerId: string, options: any) {
      this.auth = auth;
      this.containerId = containerId;
      this.options = options;
    }
  }

  return {
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    GoogleAuthProvider: MockGoogleAuthProvider,
    OAuthProvider: MockOAuthProvider,
    signInWithPopup: vi.fn(),
    sendEmailVerification: vi.fn(),
    confirmPasswordReset: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
    RecaptchaVerifier: MockRecaptchaVerifier,
    signInWithPhoneNumber: vi.fn(),
  };
});

describe('authService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe('register', () => {
    it('creates user with Firebase, sends verification email, and creates backend user', async () => {
      const mockUser = { uid: 'uid_123', email: 'test@crezine.com' };
      vi.mocked(firebaseAuth.createUserWithEmailAndPassword).mockResolvedValue({
        user: mockUser,
      } as any);
      vi.mocked(firebaseAuth.sendEmailVerification).mockResolvedValue(undefined);

      const mockUserProfile: UserProfile = {
        id: 'uid_123',
        email: 'test@crezine.com',
        name: 'Test Creator',
        role: 'creator',
      };
      const apiPostSpy = vi.spyOn(api, 'post').mockResolvedValue(mockUserProfile);

      const result = await authService.register('test@crezine.com', 'SecurePass123!');

      expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@crezine.com',
        'SecurePass123!'
      );
      expect(firebaseAuth.sendEmailVerification).toHaveBeenCalledWith(mockUser);
      expect(apiPostSpy).toHaveBeenCalledWith('/users/signup', {});
      expect(result).toEqual(mockUserProfile);
    });

    it('proceeds even if sending verification email fails', async () => {
      const mockUser = { uid: 'uid_123', email: 'test@crezine.com' };
      vi.mocked(firebaseAuth.createUserWithEmailAndPassword).mockResolvedValue({
        user: mockUser,
      } as any);
      vi.mocked(firebaseAuth.sendEmailVerification).mockRejectedValue(new Error('Email quota exceeded'));

      const mockUserProfile: UserProfile = {
        id: 'uid_123',
        email: 'test@crezine.com',
        role: 'user',
      };
      vi.spyOn(api, 'post').mockResolvedValue(mockUserProfile);

      const result = await authService.register('test@crezine.com', 'SecurePass123!');
      expect(result).toEqual(mockUserProfile);
    });
  });

  describe('login & syncBackendProfile', () => {
    it('signs in with Firebase and fetches user profile from /users/signin', async () => {
      vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue({} as any);
      const mockUserProfile: UserProfile = {
        id: 'uid_456',
        email: 'login@crezine.com',
        name: 'Logged In User',
        role: 'user',
      };
      const apiPostSpy = vi.spyOn(api, 'post').mockResolvedValue(mockUserProfile);

      const result = await authService.login('login@crezine.com', 'Password123');

      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'login@crezine.com',
        'Password123'
      );
      expect(apiPostSpy).toHaveBeenCalledWith('/users/signin', {});
      expect(result).toEqual(mockUserProfile);
    });

    it('falls back to /users/signup when /users/signin returns 404 (user does not exist in backend yet)', async () => {
      vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue({} as any);
      const mockUserProfile: UserProfile = {
        id: 'uid_789',
        email: 'fallback@crezine.com',
        role: 'creator',
      };

      const apiPostSpy = vi.spyOn(api, 'post')
        .mockRejectedValueOnce(new ApiError('User not found', 404, {}))
        .mockResolvedValueOnce(mockUserProfile);

      const result = await authService.login('fallback@crezine.com', 'Password123');

      expect(apiPostSpy).toHaveBeenNthCalledWith(1, '/users/signin', {});
      expect(apiPostSpy).toHaveBeenNthCalledWith(2, '/users/signup', {});
      expect(result).toEqual(mockUserProfile);
    });

    it('does NOT fallback to /users/signup if signin error is unexpected property error', async () => {
      vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue({} as any);
      const error = new ApiError('property extraField should not exist', 400, {});
      vi.spyOn(api, 'post').mockRejectedValue(error);

      await expect(authService.login('test@crezine.com', 'pass')).rejects.toThrow(
        'property extraField should not exist'
      );
    });
  });

  describe('Social Logins', () => {
    it('loginWithGoogle invokes signInWithPopup with GoogleAuthProvider and syncs profile', async () => {
      vi.mocked(firebaseAuth.signInWithPopup).mockResolvedValue({} as any);
      const mockUserProfile: UserProfile = {
        id: 'uid_google',
        email: 'google@gmail.com',
        displayName: 'Google User',
        role: 'user',
      };
      const apiPostSpy = vi.spyOn(api, 'post').mockResolvedValue(mockUserProfile);

      const result = await authService.loginWithGoogle();

      expect(firebaseAuth.signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
      expect(apiPostSpy).toHaveBeenCalledWith('/users/signin', {});
      expect(result).toEqual(mockUserProfile);
    });

    it('loginWithApple invokes signInWithPopup with OAuthProvider apple.com and syncs profile', async () => {
      vi.mocked(firebaseAuth.signInWithPopup).mockResolvedValue({} as any);
      const mockUserProfile: UserProfile = {
        id: 'uid_apple',
        email: 'apple@icloud.com',
        role: 'creator',
      };
      const apiPostSpy = vi.spyOn(api, 'post').mockResolvedValue(mockUserProfile);

      const result = await authService.loginWithApple();

      expect(firebaseAuth.signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
      expect(apiPostSpy).toHaveBeenCalledWith('/users/signin', {});
      expect(result).toEqual(mockUserProfile);
    });
  });

  describe('logout', () => {
    it('calls firebase signOut and clears token and userData from localStorage', async () => {
      localStorage.setItem('firebaseToken', 'test-token');
      localStorage.setItem('userData', JSON.stringify({ name: 'Bob' }));

      vi.mocked(firebaseAuth.signOut).mockResolvedValue(undefined);

      await authService.logout();

      expect(firebaseAuth.signOut).toHaveBeenCalledWith(auth);
      expect(localStorage.getItem('firebaseToken')).toBeNull();
      expect(localStorage.getItem('userData')).toBeNull();
    });
  });

  describe('Email OTP Verification', () => {
    it('sends email OTP via /v1/auth/otp/send', async () => {
      const apiPostSpy = vi.spyOn(api, 'post').mockResolvedValue({ sent: true });

      await authService.sendEmailOtp('user@test.com');

      expect(apiPostSpy).toHaveBeenCalledWith('/v1/auth/otp/send', { email: 'user@test.com' });
    });

    it('transforms 404 "cannot post" error into user-friendly message for sendEmailOtp', async () => {
      vi.spyOn(api, 'post').mockRejectedValue(
        new ApiError('Cannot POST /v1/auth/otp/send', 404, {})
      );

      await expect(authService.sendEmailOtp('user@test.com')).rejects.toThrow(
        /Email code verification is not available on the hosted API yet/
      );
    });

    it('verifies email OTP via /v1/auth/otp/verify', async () => {
      const apiPostSpy = vi.spyOn(api, 'post').mockResolvedValue({ verified: true });

      await authService.verifyEmailOtp('user@test.com', '12345');

      expect(apiPostSpy).toHaveBeenCalledWith('/v1/auth/otp/verify', {
        email: 'user@test.com',
        code: '12345',
      });
    });

    it('transforms 404 "cannot post" error into user-friendly message for verifyEmailOtp', async () => {
      vi.spyOn(api, 'post').mockRejectedValue(
        new ApiError('Cannot POST /v1/auth/otp/verify', 404, {})
      );

      await expect(authService.verifyEmailOtp('user@test.com', '12345')).rejects.toThrow(
        /Email code verification is not available on the hosted API yet/
      );
    });
  });

  describe('Password Reset & Verification', () => {
    it('sends password reset email', async () => {
      vi.mocked(firebaseAuth.sendPasswordResetEmail).mockResolvedValue(undefined);

      await authService.sendPasswordResetEmail('reset@crezine.com');

      expect(firebaseAuth.sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'reset@crezine.com');
    });

    it('confirms password reset', async () => {
      vi.mocked(firebaseAuth.confirmPasswordReset).mockResolvedValue(undefined);

      await authService.confirmPasswordReset('oobCode123', 'NewPass123!');

      expect(firebaseAuth.confirmPasswordReset).toHaveBeenCalledWith(
        auth,
        'oobCode123',
        'NewPass123!'
      );
    });

    it('sends email verification if currentUser is present', async () => {
      const mockUser = { uid: 'user_active' };
      // @ts-ignore
      auth.currentUser = mockUser as any;
      vi.mocked(firebaseAuth.sendEmailVerification).mockResolvedValue(undefined);

      await authService.sendEmailVerification();

      expect(firebaseAuth.sendEmailVerification).toHaveBeenCalledWith(mockUser);
      // @ts-ignore
      auth.currentUser = null;
    });
  });

  describe('Phone Auth Recaptcha & OTP', () => {
    it('sets up RecaptchaVerifier with invisible size', () => {
      const verifier = authService.setupRecaptcha('custom-recaptcha');
      expect(verifier).toBeDefined();
      expect((verifier as any).containerId).toBe('custom-recaptcha');
      expect((verifier as any).options).toEqual({ size: 'invisible' });
    });

    it('sends OTP with signInWithPhoneNumber', async () => {
      const mockConfirmationResult = { confirm: vi.fn() };
      vi.mocked(firebaseAuth.signInWithPhoneNumber).mockResolvedValue(mockConfirmationResult as any);

      const fakeVerifier = {} as any;
      const result = await authService.sendOtp('+254712345678', fakeVerifier);

      expect(firebaseAuth.signInWithPhoneNumber).toHaveBeenCalledWith(
        auth,
        '+254712345678',
        fakeVerifier
      );
      expect(result).toBe(mockConfirmationResult);
    });
  });

  describe('getMe & updateProfile', () => {
    it('getMe fetches from /auth/me successfully', async () => {
      const mockUserProfile: UserProfile = {
        id: 'me_123',
        email: 'me@crezine.com',
        role: 'user',
      };
      const apiGetSpy = vi.spyOn(api, 'get').mockResolvedValue(mockUserProfile);

      const result = await authService.getMe();
      expect(apiGetSpy).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUserProfile);
    });

    it('getMe falls back to /users/me when /auth/me returns 404', async () => {
      const mockUserProfile: UserProfile = {
        id: 'me_fallback',
        email: 'me@crezine.com',
        role: 'user',
      };
      const apiGetSpy = vi.spyOn(api, 'get')
        .mockRejectedValueOnce(new ApiError('Not found', 404, {}))
        .mockResolvedValueOnce(mockUserProfile);

      const result = await authService.getMe();
      expect(apiGetSpy).toHaveBeenNthCalledWith(1, '/auth/me');
      expect(apiGetSpy).toHaveBeenNthCalledWith(2, '/users/me');
      expect(result).toEqual(mockUserProfile);
    });

    it('updateProfile puts to /auth/me and falls back to /users/me on 404', async () => {
      const updatedProfile: UserProfile = {
        id: 'me_123',
        email: 'me@crezine.com',
        name: 'Updated Name',
        role: 'creator',
      };
      const apiPutSpy = vi.spyOn(api, 'put')
        .mockRejectedValueOnce(new ApiError('Not found', 404, {}))
        .mockResolvedValueOnce(updatedProfile);

      const result = await authService.updateProfile({ name: 'Updated Name' });
      expect(apiPutSpy).toHaveBeenNthCalledWith(1, '/auth/me', { name: 'Updated Name' });
      expect(apiPutSpy).toHaveBeenNthCalledWith(2, '/users/me', { name: 'Updated Name' });
      expect(result).toEqual(updatedProfile);
    });
  });
});
