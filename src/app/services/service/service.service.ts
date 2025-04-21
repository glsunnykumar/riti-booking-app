import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceModel } from '../../models/service.model';
//import { docSnapshots } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private firestore: Firestore = inject(Firestore);
  private serviceCollection = collection(this.firestore, 'services');


  constructor() { }

   // Create Service
   addService(service: ServiceModel) {
    return addDoc(this.serviceCollection, {
      ...service,
      createdAt: new Date(),
      isActive: true
    });
  }

   // Get all Services
   getServices(): Observable<ServiceModel[]> {
    return collectionData(this.serviceCollection, {
      idField: 'id',
    }) as Observable<ServiceModel[]>;
  }

  // Get a single service by ID
  getServiceById(id: string): Observable<ServiceModel> {
    const serviceDoc = doc(this.firestore, `services/${id}`);
    return docData(serviceDoc, { idField: 'id' }) as Observable<ServiceModel>;
  }

  // Update a service
  updateService(id: string, data: Partial<ServiceModel>) {
    const serviceDoc = doc(this.firestore, `services/${id}`);
    return updateDoc(serviceDoc, data);
  }

  // Delete a service
  deleteService(id: string) {
    const serviceDoc = doc(this.firestore, `services/${id}`);
    return deleteDoc(serviceDoc);
  }
}
