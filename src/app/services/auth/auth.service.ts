import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router'; 
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  private firestore: Firestore = inject(Firestore);
  userRole: 'admin' | 'user' | null = null;

  constructor(private router: Router) {
    this.auth.onAuthStateChanged(user => this.userSubject.next(user));
  }

  // Login Admin
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Fetch role from Firestore
    const userRef = doc(this.firestore, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      this.userRole = userSnap.data()['role'];
      
      // Redirect based on role
      if (this.userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/bookings']);
      }
    } else {
      console.error('User role not found');
    }
  } catch (error: any) {
    console.error('Login error:', error);
  }
    
  

   // Logout Admin
   async logout() {
    await signOut(this.auth);
    this.userRole = null;
    this.router.navigate(['/']);
  }

    // Check if User is Admin
    async isAdmin(): Promise<boolean> {
      const currentUser = this.auth.currentUser;
      if (!currentUser) return false;
  
      const userDocRef = doc(this.firestore, `users/${currentUser.uid}`);
      const userDocSnap = await getDoc(userDocRef);
  
      return userDocSnap.exists() && userDocSnap.data()?.['role'] === 'admin';
    }
}
