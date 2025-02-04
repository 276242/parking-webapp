import axios, { AxiosInstance } from 'axios';
import { LoginDto } from '../api/dto/login.dto';
import { LoginResponseDto } from '../api/dto/login-response.dto';

export class ParkingClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081/api',
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const response = await this.client.post<LoginResponseDto>('/auth/login', data);
    localStorage.setItem('token', response.data.token || '');
    return response.data;
  }

  async getParkingSpot(id: string): Promise<any> {
    const response = await this.client.get(`/parkingspot/${id}`);
    return response.data;
  }

  async getParkingHistory(): Promise<any[]> {
    const response = await this.client.get('/parkinghistory');
    return response.data;
  }

  async confirmParking(spotId: string): Promise<void> {
    await this.client.post('/parkinghistory', { parkingSpotId: spotId });
  }
}
