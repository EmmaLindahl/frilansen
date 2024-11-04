import React from 'react';
import { useForm } from 'react-hook-form';

const Settings = () => {
    const {register, handleSubmit, formState: { errors },} = useForm()
    const onSubmit = (input) => {
        console.log("Form Data Submitted:", input);
    }


    return (
        <>
            <h1>Inställningar</h1>
            <div className="card">           
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block'}}>Förnamn:</span>
                            <input {...register("firstName", { required: "firstname is required" })} placeholder={errors.firstName ? errors.firstName.message : ""}/>
                        </label>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Efternamn:</span>
                            <input {...register("lastName", { required: "lastname is required" })} placeholder={errors.lastName ? errors.lastName.message : ""}/>
                        </label>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Bolag:</span>
                            <input {...register("company")} />
                        </label>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Roll:</span>
                            <input {...register("role")} />
                        </label>
                    </div>
                    
                    <label className='labelStyle'>
                        <span style={{ minWidth: '100px', display: 'inline-block' }}>Verksam inom:</span>
                        <input {...register("area")} />
                    </label>
                    
                    <label className='labelStyle'>
                        <span style={{ minWidth: '100px', display: 'inline-block' }}>Hemsida:</span>
                        <input {...register("website")} />
                    </label>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Telefon nummer:</span>
                            <input {...register("phone")} />
                        </label>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Mail Adress:</span>
                            <input {...register("mail")} />
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