import "./App.css"
import { useState , useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {firestore }from './firebase';
import { collection, addDoc, } from 'firebase/firestore';

const Kisiekle = () => {
    const navigate = useNavigate();
    const [telNo, setTelNo] = useState('');
    const [isim, setIsim] = useState('');
    const [soyisim, setSoyisim] = useState('');
    const [eposta, setEposta] = useState('');  

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const docRef = await addDoc(collection(firestore, 'users'), {
              isim ,
              soyisim,
              eposta,
              telNo,
            });
            alert("KAYIT BAŞARILI!!..", docRef.id)            
        } catch (error) {
          console.error('Firestore\'a veri eklenirken hata oluştu:', error);
        }
       
      };
       
      
    
  return (
    <div className='input-container'><h2 >Kişisel Bilgi Form</h2>
    <div>
  <form onSubmit={handleSubmit}>
    <label for="fname">İsim</label>
    <input type="text" id="fname" name="Isim" placeholder="Adınızı Giriniz" value={isim} onChange={(e) => setIsim(e.target.value)}/>

    <label for="lname">Soyisim</label>
    <input type="text" id="lname" name="Soyisim" placeholder="Soyisminizi Giriniz" value={soyisim} onChange={(e) => setSoyisim(e.target.value)}/>
    <label for="lname">Telefon Numarası</label>
    <input type="text" id="lname" name="telNo" placeholder="5xx-xxx-xxxx" value={telNo} onChange={(e) => setTelNo(e.target.value)}/>
    <label for="lname">E-posta</label>
    <input type="text" id="lname" name="email" placeholder="ornek@gmail.com" value={eposta} onChange={(e) => setEposta(e.target.value)}/>

    <input type="submit" value="Kaydet"/>
  </form>
</div>
    {/* <form onSubmit={handleSubmit}><label className='form-input'>
      İsim:
      <input className='input-right' type="text" value={isim} onChange={(e) => setIsim(e.target.value)} />
    </label>
    <br />
    <label className='form-input'>
      Soyisim:
      <input className='input-right1' type="text" value={soyisim} onChange={(e) => setSoyisim(e.target.value)} />
    </label>
    <br />
    <label className='form-input'>
      Tel No:
      <input className='input-right2'  type="number" value={telNo} onChange={(e) => setTelNo(e.target.value)} />
    </label>
    <br />
    <label>
      Eposta:
      <input  type="email" value={eposta} onChange={(e) => setEposta(e.target.value)} />
    </label>
    <br />
    <button className='button' type='submit'>Kaydet</button>
    <hr /></form> */}

       <button className='button1' onClick={()=>{navigate (-1)}}>Geri</button>
      
    </div>
    
  )
}

export default Kisiekle