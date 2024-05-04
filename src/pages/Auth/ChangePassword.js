import React, { useState } from 'react';
import { auth } from '../services/firebase-config';
import {  reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import './ChangePassword.scss';
import { useHistory } from 'react-router-dom';
const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(email, currentPassword);

            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            alert("Password has been changed successfully.");
            history.push('/');
        } catch (error) {
            alert(`Failed to change password: ${error.message}`);
        }
    };

    return (
        <div className="change-password-background">
            <div className="change-password-container">
                <div className="change-password-content row">
                    <div className="col-12 text-change-password">Change Password</div>
                    <div className="col-12 form-group change-password-input">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-12 form-group change-password-input">
                        <label>Current Password:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            className="form-control"
                            placeholder="Enter your current password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12 form-group change-password-input">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            className="form-control"
                            placeholder="Enter your new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12 form-group change-password-input">
                        <label>Confirm New Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            className="form-control"
                            placeholder="Enter your confirm new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <button class="button-change-password" onClick={(e) => handleChangePassword(e)}>Change</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
