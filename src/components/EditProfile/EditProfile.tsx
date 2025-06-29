import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { setUpdateProfile } from '../../store/financeSlice';
import Button from '../Button/Button';
import './EditProfile.css';
import back from '../../assets/icons/back.svg';
import notif from '../../assets/icons/notif.svg';
import profile from '../../assets/icons/prof.svg';
import cam from '../../assets/icons/Cam.svg';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
}

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userData, setUserData] = useState<User>({
    id: '',
    name: '',
    email: '',
    phone: '',
    avatar: '',
    password: ''
  });

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Load user data on component mount
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('user');
    
    if (userId && username) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUserData(data);
          setInputName(data.name);
          setInputEmail(data.email);
          setInputPhone(data.phone);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '+7 ' || value === '+7' || value === '') {
      setInputPhone('');
      return;
    }
  
    const digits = value.replace(/[^\d]/g, '');
    
    if (digits === '7' || digits === '') {
      setInputPhone('');
      return;
    }
  
    let formattedValue = '+7 ';
    if (digits.length > 1) {
      const phoneDigits = digits.substring(1);
      
      if (phoneDigits.length > 0) {
        formattedValue += `(${phoneDigits.substring(0, 3)}`;
      }
      if (phoneDigits.length > 3) {
        formattedValue += `) ${phoneDigits.substring(3, 6)}`;
      }
      if (phoneDigits.length > 6) {
        formattedValue += `-${phoneDigits.substring(6, 8)}`;
      }
      if (phoneDigits.length > 8) {
        formattedValue += `-${phoneDigits.substring(8, 10)}`;
      }
    }
  
    setInputPhone(formattedValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const selectionStart = e.target.selectionStart;
    
    if (value.endsWith('@gmail.com') && selectionStart && selectionStart > value.indexOf('@')) {
      e.preventDefault();
      return;
    }
  
    const atIndex = value.indexOf('@');
    let localPart = atIndex === -1 ? value : value.substring(0, atIndex);
    let domain = atIndex === -1 ? '' : value.substring(atIndex + 1);
  
    if (selectionStart && selectionStart <= localPart.length) {
      if (localPart && !domain) {
        setInputEmail(`${localPart}@gmail.com`);
        
        setTimeout(() => {
          if (e.target) {
            e.target.setSelectionRange(localPart.length, localPart.length);
          }
        }, 0);
      } else {
        setInputEmail(value);
      }
    }
    else if (domain !== 'gmail.com') {
      setInputEmail(localPart ? `${localPart}@gmail.com` : '');
    }
  };

  async function saveOperations() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      let avatarBase64 = userData.avatar;
      
      // If new image was selected
      if (selectedImage) {
        avatarBase64 = selectedImage;
      }

      const updatedUser = {
        ...userData,
        name: inputName || userData.name,
        email: inputEmail || userData.email,
        phone: inputPhone || userData.phone,
        avatar: avatarBase64
      };

      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      // Update local state and storage
      setUserData(updatedUser);
      localStorage.setItem('user', updatedUser.name);
      
      // Show success notification
      dispatch(setUpdateProfile(true));
      setTimeout(() => dispatch(setUpdateProfile(false)), 3000);

    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  }

  return (
    <div className="edit-profile">
      <div className="analyzis-search__up">
        <div className="analyzis-search__up-container">
          <div className="analyzis-search__up-nav">
            <Link to='/profile'>
              <div className="analyzis-search__up-back">
                <img src={back} alt="Back" />
              </div>
            </Link>
            <div className="analyzis-search__up-text-outer">
              <h2 className='analyzis-search__up-text'>Edit Profile</h2>
            </div>
            <div className="analyzis-search__up-notifications">
              <img src={notif} alt="Notifications" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="edit-profile__main">
        <div className="edit-profile__main-container">
          <div className="edit-profile__main-icon">
            <div 
              className="edit-profile__main-icon-container" 
              onClick={handleImageClick}
            >
              <img 
                className='edit-profile__main-icon-img' 
                src={selectedImage || userData.avatar || profile} 
                alt="Profile" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = profile;
                }}
              />
              <img 
                className='edit-profile__main-icon-cam' 
                src={cam} 
                alt="Change photo" 
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          </div>
          
          <div className="edit-profile__main-name">
            <h2 className='edit-profile__main-name-text'>
              {userData.name || localStorage.getItem('user')}
            </h2>
          </div>
          
          <div className="edit-profile__main-info">
            <h2>Account Setting</h2>
            
            <div className="edit-profile__main-info-item">
              <p>Username</p>
              <input 
                value={inputName}
                onChange={(e) => setInputName(e.target.value)} 
                className='edit-profile__main-info-item-input' 
                placeholder={userData.name} 
                type="text" 
              />
            </div>
            
            <div className="edit-profile__main-info-item">
              <p>Phone</p>
              <input 
                value={inputPhone}
                onChange={handlePhoneChange} 
                className='edit-profile__main-info-item-input' 
                placeholder={userData.phone} 
                type="text" 
              />
            </div>
            
            <div className="edit-profile__main-info-item">
              <p>Email Address</p>
              <input 
                value={inputEmail}
                onChange={handleEmailChange} 
                className='edit-profile__main-info-item-input' 
                placeholder={userData.email} 
                type="text" 
              />
            </div>
          </div>
          
          <div 
            onClick={saveOperations} 
            className="edit-profile__main-button"
          >
            <Button text='Update Profile' color='#00D09E' />
          </div>
        </div>
      </div>
    </div>
  );
}