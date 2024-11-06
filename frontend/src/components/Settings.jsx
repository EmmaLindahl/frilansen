import React from 'react';
import { useForm } from 'react-hook-form';

const Settings = () => {
    const {register, handleSubmit, formState: { errors },} = useForm()
    const userId = 1

    const onSubmit = async (input) => {
        console.log("Form Data Submitted:", input);
        try {
            const response =await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(input)
            })
            const data = await response.json()
            console.log("User updated:", data)
        }catch (error){
            console.error("Failed to update user:", error)
        }
    }
    

    return (
        <>
            <h1>Inställningar</h1>
            <div className="card">           
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block'}}>Förnamn:</span>
                            <input {...register("firstname", { required: "firstname is required" })} placeholder={errors.firstname ? errors.firstname.message : ""}/>
                        </label>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Efternamn:</span>
                            <input {...register("lastname", { required: "lastname is required" })} placeholder={errors.lastname ? errors.lastname.message : ""}/>
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
        </>
    );
    
}


export default Settings;