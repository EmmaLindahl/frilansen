import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import * as jwt_decode from 'jwt-decode';
// import jwt_decode from 'jwt-decode';
// import {jwt_decode} from 'jwt-decode';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token); // HÄR!
         setUserId(decodedToken.userId);
        //  console.log(decodedToken)
    }
  }, []);

  useEffect(() => {
      if (userId) {
      const token = localStorage.getItem('token');
      fetch(`/api/user/${userId}`, {headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }})
        .then(response => response.json())
        .then((data) => {
          setData(data);
          console.log("Fetch from Settings", data);
        });
    }
  }, [userId]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstname: data?.firstname || '',
      lastname: data?.lastname || '',
      company: data?.company || '',
      professionalrole: data?.professionalrole || '',
      area: data?.area || '',
      webbadress: data?.webbadress || '',
      phonenumber: data?.phonenumber || '',
      email: data?.email || ''
    }
  });

  useEffect(() => {
    if (data) {
      reset({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        company: data.company || '',
        professionalrole: data.professionalrole || '',
        area: data.area || '',
        webbaddress: data.webbadress || '',
        phonenumber: data.phonenumber || '',
        email: data.email || ''
      });
    }
  }, [data, reset]);

  const onSubmit = async (input) => {
    console.log(`Form data submitted: ${input}`);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(input)
      });
      const data = await response.json();
      console.log("User updated:", data);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const onDeleteUser = async () => {
    // const token = localStorage.getItem('token');
    // try {
    //   const response = await fetch(`/api/user/${userId}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     },
    //   });
  
      if (1) { //response.ok
        console.log("User deleted successfully");
        localStorage.removeItem('token');
        setData(null);
        setUserId(null);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error("Failed to delete user:", errorData);
      }
    // }
    //  catch (error) {
    //   console.error("Error deleting user:", error);
    // }
  };  

  return (
    <>
      <h1>Inställningar</h1>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label className='labelStyle'>
              <span style={{ minWidth: '100px', display: 'inline-block' }}>Förnamn:</span>
              <input {...register("firstname", { required: "firstname is required" })} placeholder={errors.firstname ? errors.firstname.message : ""} />
            </label>
            <label className='labelStyle'>
              <span style={{ minWidth: '100px', display: 'inline-block' }}>Efternamn:</span>
              <input {...register("lastname", { required: "lastname is required" })} placeholder={errors.lastname ? errors.lastname.message : ""} />
            </label>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <label className='labelStyle'>
              <span style={{ minWidth: '100px', display: 'inline-block' }}>Bolag:</span>
              <input {...register("company")} />
            </label>
            <label className='labelStyle'>
              <span style={{ minWidth: '100px', display: 'inline-block' }}>Roll:</span>
              <input {...register("professionalrole")} />
            </label>
          </div>

          <label className='labelStyle'>
            <span style={{ minWidth: '100px', display: 'inline-block' }}>Verksam inom:</span>
            <input {...register("area")} />
          </label>

          <label className='labelStyle'>
            <span style={{ minWidth: '100px', display: 'inline-block' }}>Hemsida:</span>
            <input {...register("webbaddress")} />
          </label>

          <div style={{ display: 'flex', gap: '15px' }}>
            <label className='labelStyle'>
              <span style={{ minWidth: '100px', display: 'inline-block' }}>Telefon nummer:</span>
              <input {...register("phonenumber")} />
            </label>
            <label className='labelStyle'>
              <span style={{ minWidth: '100px', display: 'inline-block' }}>Mail Adress:</span>
              <input {...register("email")} />
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
            <input className='submit' type="submit" value="Submit" style={{ minWidth: '150px' }} />
          </div>
        </form>
      </div>

      <form onSubmit={handleSubmit(onDeleteUser)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
  <label className='labelStyle'>
    <span style={{ minWidth: '100px', display: 'inline-block' }}>Password:</span>
    <input {...register("password")} />
  </label>
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
    <input className='submit' type="submit" value="Delete" style={{ minWidth: '150px' }} />
  </div>
</form>

    </>
  );
};

export default Settings;
