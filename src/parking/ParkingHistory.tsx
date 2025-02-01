import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface HistoryEntry {
  id: number;
  spotId: string;
  parkedAt: string;
}

const ParkingHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<HistoryEntry[]>('http://localhost:8080/api/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching parking history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container">
      <h2>📜 Parking History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry.id}>
              📅 <strong>{entry.parkedAt}</strong> - 🏷 <strong>Spot:</strong> {entry.spotId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParkingHistory;
