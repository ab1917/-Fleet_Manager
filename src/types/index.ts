export interface Vehicle {
  id: string;
  type: 'truck' | 'crane' | 'munk' | 'other';
  status: 'active' | 'maintenance' | 'inactive';
  brand: string;
  model: string;
  year: number;
  plate: string;
  chassisNumber: string;
  lastMaintenance: string;
  nextMaintenance: string;
  currentDriver?: string;
  documents: VehicleDocument[];
  fuelConsumption: FuelConsumption[];
  maintenanceHistory: MaintenanceRecord[];
}

export interface VehicleDocument {
  id: string;
  type: 'license' | 'insurance' | 'inspection';
  number: string;
  expirationDate: string;
  status: 'valid' | 'expired' | 'expiring_soon';
}

export interface FuelConsumption {
  id: string;
  date: string;
  liters: number;
  kilometers: number;
  cost: number;
}

export interface MaintenanceRecord {
  id: string;
  type: 'preventive' | 'corrective' | 'calibration';
  date: string;
  description: string;
  cost: number;
  provider: string;
  status: 'completed' | 'scheduled' | 'in_progress';
}

export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  type: 'scheduled' | 'overdue' | 'urgent';
  description: string;
  dueDate: string;
}

export interface Driver {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  license: {
    number: string;
    category: string;
    expiration: string;
  };
  certifications: Certification[];
  status: 'available' | 'on_duty' | 'off_duty';
  currentVehicle?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuedDate: string;
  expirationDate: string;
  issuingBody: string;
}