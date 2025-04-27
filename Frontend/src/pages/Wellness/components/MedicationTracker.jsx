import React, { useState, useEffect } from 'react';
import './MedicationTracker.css';

const MedicationTracker = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: [],
    instructions: '',
    startDate: '',
    endDate: '',
    refillDate: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [todayMeds, setTodayMeds] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [expandedMedication, setExpandedMedication] = useState(null);

  // Frequencies options for dropdown
  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'twice-daily', label: 'Twice Daily' },
    { value: 'three-times-daily', label: 'Three Times Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'as-needed', label: 'As Needed' }
  ];
  
  // Preset time slots
  const timeSlots = [
    { value: 'morning', label: 'Morning (8:00 AM)' },
    { value: 'noon', label: 'Noon (12:00 PM)' },
    { value: 'evening', label: 'Evening (6:00 PM)' },
    { value: 'bedtime', label: 'Bedtime (10:00 PM)' }
  ];

  // Mock fetch medications data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchMedications = async () => {
      // Mock data
      const mockMedications = [
        {
          id: 1,
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'daily',
          time: ['morning'],
          instructions: 'Take with food',
          startDate: '2025-03-15',
          endDate: '',
          refillDate: '2025-05-15',
          doctor: 'Dr. Johnson',
          pharmacy: 'MediCare Pharmacy',
          phoneNumber: '555-123-4567',
          status: 'active',
          takenToday: true,
          color: 'blue',
          shape: 'round'
        },
        {
          id: 2,
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'twice-daily',
          time: ['morning', 'evening'],
          instructions: 'Take after meals',
          startDate: '2025-02-10',
          endDate: '',
          refillDate: '2025-05-10',
          doctor: 'Dr. Smith',
          pharmacy: 'HealthPlus Pharmacy',
          phoneNumber: '555-987-6543',
          status: 'active',
          takenToday: false,
          color: 'white',
          shape: 'oval'
        },
        {
          id: 3,
          name: 'Vitamin D',
          dosage: '1000 IU',
          frequency: 'daily',
          time: ['noon'],
          instructions: 'Take with food',
          startDate: '2025-01-01',
          endDate: '',
          refillDate: '2025-06-01',
          doctor: '',
          pharmacy: 'Online',
          phoneNumber: '',
          status: 'active',
          takenToday: true,
          color: 'yellow',
          shape: 'round'
        },
        {
          id: 4,
          name: 'Aspirin',
          dosage: '81mg',
          frequency: 'daily',
          time: ['morning'],
          instructions: 'Take with food or milk',
          startDate: '2024-12-01',
          endDate: '',
          refillDate: '2025-06-01',
          doctor: 'Dr. Johnson',
          pharmacy: 'MediCare Pharmacy',
          phoneNumber: '555-123-4567',
          status: 'active',
          takenToday: false,
          color: 'orange',
          shape: 'round'
        }
      ];
      
      setMedications(mockMedications);
      
      // Set up today's medications based on the mock data
      const today = new Date();
      const todayMedsList = mockMedications
        .filter(med => {
          const startDate = new Date(med.startDate);
          const endDate = med.endDate ? new Date(med.endDate) : null;
          
          return (
            startDate <= today && 
            (endDate === null || endDate >= today) && 
            med.status === 'active'
          );
        })
        .sort((a, b) => {
          // Sort by whether it's been taken, then by time of day
          if (a.takenToday === b.takenToday) {
            const timeOrder = { morning: 1, noon: 2, evening: 3, bedtime: 4 };
            const aTime = a.time[0] ? timeOrder[a.time[0]] || 5 : 5;
            const bTime = b.time[0] ? timeOrder[b.time[0]] || 5 : 5;
            return aTime - bTime;
          }
          return a.takenToday ? 1 : -1;
        });
        
      setTodayMeds(todayMedsList);
    };

    fetchMedications();
  }, []);

  // Handle medication taken toggle
  const handleMedicationTaken = (id, taken) => {
    // Update medications list
    const updatedMedications = medications.map(med => {
      if (med.id === id) {
        return { ...med, takenToday: taken };
      }
      return med;
    });
    
    setMedications(updatedMedications);
    
    // Update today's medications
    const updatedTodayMeds = todayMeds.map(med => {
      if (med.id === id) {
        return { ...med, takenToday: taken };
      }
      return med;
    });
    
    setTodayMeds(updatedTodayMeds);
  };

  // Handle input change for new medication form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({ ...newMedication, [name]: value });
  };

  // Handle time selection for new medication
  const handleTimeChange = (timeValue) => {
    let updatedTimes = [...newMedication.time];
    
    if (updatedTimes.includes(timeValue)) {
      updatedTimes = updatedTimes.filter(time => time !== timeValue);
    } else {
      updatedTimes.push(timeValue);
    }
    
    setNewMedication({ ...newMedication, time: updatedTimes });
  };

  // Handle medication form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMed = {
      ...newMedication,
      id: medications.length + 1,
      status: 'active',
      takenToday: false,
      color: getRandomColor(),
      shape: getRandomShape()
    };
    
    const updatedMedications = [...medications, newMed];
    setMedications(updatedMedications);
    
    // Update today's medications if necessary
    const today = new Date();
    const startDate = new Date(newMed.startDate);
    const endDate = newMed.endDate ? new Date(newMed.endDate) : null;
    
    if (startDate <= today && (endDate === null || endDate >= today)) {
      setTodayMeds([...todayMeds, newMed]);
    }
    
    // Reset form
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: [],
      instructions: '',
      startDate: '',
      endDate: '',
      refillDate: '',
    });
    
    setShowAddForm(false);
  };

  // Helper functions for random pill appearance
  const getRandomColor = () => {
    const colors = ['white', 'blue', 'red', 'yellow', 'orange', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const getRandomShape = () => {
    const shapes = ['round', 'oval', 'capsule', 'rectangle'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  // Handle expanding medication details
  const toggleMedDetails = (id) => {
    if (expandedMedication === id) {
      setExpandedMedication(null);
    } else {
      setExpandedMedication(id);
    }
  };

  // Get refill status text and class
  const getRefillStatus = (refillDate) => {
    const today = new Date();
    const refill = new Date(refillDate);
    const daysUntilRefill = Math.ceil((refill - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilRefill <= 0) {
      return { text: 'Refill now', className: 'refill-urgent' };
    } else if (daysUntilRefill <= 7) {
      return { text: `Refill in ${daysUntilRefill} days`, className: 'refill-soon' };
    } else {
      return { text: `Refill in ${daysUntilRefill} days`, className: 'refill-ok' };
    }
  };

  // Today Medications Tab View
  const TodayMedsView = () => (
    <div className="today-meds-container">
      <h3>Today's Medications</h3>
      
      {todayMeds.length === 0 ? (
        <div className="no-meds-message">
          <p>No medications scheduled for today</p>
        </div>
      ) : (
        <div className="med-list">
          {todayMeds.map(med => (
            <div 
              key={med.id} 
              className={`med-card ${med.takenToday ? 'taken' : ''}`}
            >
              <div className="med-card-header">
                <div className="med-pill-icon" style={{ backgroundColor: med.color }}>
                  {med.shape === 'capsule' && <div className="capsule-overlay"></div>}
                </div>
                <div className="med-basic-info">
                  <h4>{med.name}</h4>
                  <p className="med-dosage">{med.dosage}</p>
                </div>
                <div className="med-time">
                  {med.time.map(t => (
                    <span key={t} className="time-badge">
                      {timeSlots.find(slot => slot.value === t)?.label || t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="med-actions">
                {med.takenToday ? (
                  <>
                    <button 
                      className="action-button taken-button"
                      disabled
                    >
                      ✓ Taken
                    </button>
                    <button 
                      className="action-button undo-button"
                      onClick={() => handleMedicationTaken(med.id, false)}
                    >
                      Undo
                    </button>
                  </>
                ) : (
                  <button 
                    className="action-button take-button"
                    onClick={() => handleMedicationTaken(med.id, true)}
                  >
                    Mark as Taken
                  </button>
                )}
                <button 
                  className={`details-toggle ${expandedMedication === med.id ? 'active' : ''}`}
                  onClick={() => toggleMedDetails(med.id)}
                >
                  {expandedMedication === med.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              {expandedMedication === med.id && (
                <div className="med-details">
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Instructions:</span>
                      <span className="detail-value">{med.instructions}</span>
                    </div>
                    {med.doctor && (
                      <div className="detail-item">
                        <span className="detail-label">Doctor:</span>
                        <span className="detail-value">{med.doctor}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="detail-label">Pharmacy:</span>
                      <span className="detail-value">{med.pharmacy}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Refill:</span>
                      <span className={`detail-value ${getRefillStatus(med.refillDate).className}`}>
                        {getRefillStatus(med.refillDate).text}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="today-summary">
        <p>
          <strong>
            {todayMeds.filter(m => m.takenToday).length} of {todayMeds.length}
          </strong> medications taken today
        </p>
        <progress 
          value={todayMeds.filter(m => m.takenToday).length} 
          max={todayMeds.length}
        ></progress>
      </div>
    </div>
  );

  // All Medications Tab View
  const AllMedsView = () => (
    <div className="all-meds-container">
      <div className="all-meds-header">
        <h3>All Medications</h3>
        <button 
          className="add-med-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Medication'}
        </button>
      </div>
      
      {showAddForm && (
        <form className="add-med-form" onSubmit={handleSubmit}>
          <h4>Add New Medication</h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="med-name">Medication Name*</label>
              <input
                id="med-name"
                type="text"
                name="name"
                value={newMedication.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="med-dosage">Dosage*</label>
              <input
                id="med-dosage"
                type="text"
                name="dosage"
                value={newMedication.dosage}
                onChange={handleInputChange}
                required
                placeholder="e.g., 10mg"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="med-frequency">Frequency*</label>
              <select
                id="med-frequency"
                name="frequency"
                value={newMedication.frequency}
                onChange={handleInputChange}
                required
              >
                {frequencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group wide">
              <label>Time of Day*</label>
              <div className="time-options">
                {timeSlots.map(slot => (
                  <label key={slot.value} className="time-option">
                    <input
                      type="checkbox"
                      checked={newMedication.time.includes(slot.value)}
                      onChange={() => handleTimeChange(slot.value)}
                    />
                    <span>{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group wide">
              <label htmlFor="med-instructions">Instructions</label>
              <textarea
                id="med-instructions"
                name="instructions"
                value={newMedication.instructions}
                onChange={handleInputChange}
                placeholder="Special instructions for taking this medication"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="med-start">Start Date*</label>
              <input
                id="med-start"
                type="date"
                name="startDate"
                value={newMedication.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="med-end">End Date (if applicable)</label>
              <input
                id="med-end"
                type="date"
                name="endDate"
                value={newMedication.endDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="med-refill">Refill Date*</label>
              <input
                id="med-refill"
                type="date"
                name="refillDate"
                value={newMedication.refillDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Save Medication
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {!showAddForm && (
        <div className="all-meds-list">
          {medications.length === 0 ? (
            <div className="no-meds-message">
              <p>No medications added yet</p>
              <button 
                className="add-med-button centered"
                onClick={() => setShowAddForm(true)}
              >
                + Add Your First Medication
              </button>
            </div>
          ) : (
            <table className="meds-table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Time</th>
                  <th>Refill</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {medications.map(med => (
                  <tr key={med.id}>
                    <td>
                      <div className="med-name-cell">
                        <div 
                          className="med-pill-icon small" 
                          style={{ backgroundColor: med.color }}
                        >
                          {med.shape === 'capsule' && <div className="capsule-overlay"></div>}
                        </div>
                        <span>{med.name}</span>
                      </div>
                    </td>
                    <td>{med.dosage}</td>
                    <td>
                      {frequencyOptions.find(f => f.value === med.frequency)?.label}
                    </td>
                    <td>
                      <div className="med-times">
                        {med.time.map(t => (
                          <span key={t} className="time-badge small">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={getRefillStatus(med.refillDate).className}>
                        {getRefillStatus(med.refillDate).text}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${med.status}`}>
                        {med.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="medication-tracker">
      <div className="tracker-header">
        <h2>Medication Tracker</h2>
        <p>Keep track of your medications and never miss a dose</p>
      </div>
      
      <div className="tracker-tabs">
        <button 
          className={`tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today's Medications
        </button>
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Medications
        </button>
      </div>
      
      <div className="tracker-content">
        {activeTab === 'today' ? <TodayMedsView /> : <AllMedsView />}
      </div>
    </div>
  );
};

export default MedicationTracker;