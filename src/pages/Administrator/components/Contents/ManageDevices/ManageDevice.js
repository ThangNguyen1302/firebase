import React, { useState, useEffect } from "react";
import { db } from '../../../../services/firebase-config';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import "./ManageDevice.css";
import AdminNavbar from '../../AdminNavbar';

function ManageDevice() {
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: "",
    deviceType: "",
    deviceID: "",
    deviceStatus: "",
    manufactureDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "devices"), (snapshot) => {
          const devices = [];
          snapshot.forEach((doc) => {
              devices.push({ ...doc.data(), id: doc.id });
          });
          setDeviceList(devices);
          setFilteredDevices(devices);
      });

      // Clean up function to unsubscribe from the snapshot listener when component unmounts
      return () => unsubscribe();
  }, []);


  const handleInputChange = (e) => {
    setDeviceInfo({ ...deviceInfo, [e.target.name]: e.target.value });
  };



  const handleCloseForm = () => {
    // Xử lý khi người dùng nhấp vào nút "x"
    setShowDeviceForm(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (!term) {
      setFilteredDevices(deviceList);
      return;
    }
    const filtered = deviceList.filter(
      (device) => device.deviceName.toLowerCase().includes(term)
    );
    setFilteredDevices(filtered);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedDevice;
      if (deviceInfo.id) {
        await updateDoc(doc(db, "devices", deviceInfo.id), deviceInfo);
        updatedDevice = { ...deviceInfo };
        setDeviceList((prevList) =>
          prevList.map((device) =>
            device.id === deviceInfo.id ? updatedDevice : device
          )
        );
        setFilteredDevices((prevFiltered) =>
          prevFiltered.map((device) =>
            device.id === deviceInfo.id ? updatedDevice : device
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "devices"), deviceInfo);
        updatedDevice = { ...deviceInfo, id: docRef.id };
        setDeviceList((prevList) => [...prevList, updatedDevice]);
        setFilteredDevices((prevFiltered) => [...prevFiltered, updatedDevice]);
      }
      // Cập nhật giao diện ngay lập tức
      // Đóng form sau khi lưu
      
      setShowDeviceForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm hoặc cập nhật thiết bị:", error);
    }
  };

  const handleDeleteDevice = async (deviceId) => {
    await deleteDoc(doc(db, "devices", deviceId));
    setDeviceList((prevList) =>
      prevList.filter((device) => device.id !== deviceId)
    );
    setFilteredDevices((prevFiltered) =>
      prevFiltered.filter((device) => device.id !== deviceId)
    );
  };

  return (
    <div className="manangerDevice">
      <AdminNavbar />
      <h1>Device managerment</h1>
      <input
        type="text"
        placeholder="Device searching..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => setShowDeviceForm(true)}>Add Device</button>
      {showDeviceForm && (
        <div className="modal">
          <div className="modal-content">
            <form  onSubmit={handleFormSubmit} className="device-form">
              <input
                name="deviceName"
                placeholder="Device Name"
                value={deviceInfo.deviceName}
                onChange={handleInputChange}
              />
              <input
                name="deviceType"
                placeholder="Device Type"
                value={deviceInfo.deviceType}
                onChange={handleInputChange}
              />
              <input
                name="deviceID"
                placeholder="deviceID"
                value={deviceInfo.deviceID}
                onChange={handleInputChange}
              />
              <input
                name="deviceStatus"
                placeholder="Device Status"
                value={deviceInfo.deviceStatus}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="manufactureDate"
                value={deviceInfo.manufactureDate}
                onChange={handleInputChange}
              />
              <button type="submit">Save Device</button>
            </form>
            <span className="close" onClick={handleCloseForm}>
              &times;
            </span>
          </div>
        </div>
      )}
      <div className="device-list">
        {filteredDevices.map((device) => (
          <div key={device.id} className="device-item">
            <div className="device-details">
              <h2>{device.deviceName}</h2>
              <p>Type: {device.deviceType}</p>
              <p>deviceID: {device.deviceID}</p>
              <p>Status: {device.deviceStatus}</p>
              <p>Manufacture Date: {device.manufactureDate}</p>
            </div>
            <div className="button-device">
              <button
                onClick={() => {
                  setDeviceInfo(device);
                  setShowDeviceForm(true);
                }}
              >
                Setting
              </button>
              <button onClick={() => handleDeleteDevice(device.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageDevice;
