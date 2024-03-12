import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { deleteDoc, doc, updateDoc ,collection, getDocs} from 'firebase/firestore';
import app, { firestore } from './firebase';
import './context/popup.css'


const Home = () => {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [temporaryData, setTemporaryData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKullanicilar, setFilteredKullanicilar] = useState(kullanicilar);
  const [isEditPopupOpen, setisEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [silmePop, setsilmePop] = useState(false)
  const [selectUser, setSelectUser] = useState(null)



  const handleRowClick = (userId) => {
    const selectedUserData = kullanicilar.find((user) => user.id === userId);
    if (selectedUserData) {
      setSelectedUser(selectedUserData);
      setisEditPopupOpen(true);
      console.log("Kullanıcı seçildi:", selectedUserData);
    } else {
      console.error("Kullanıcı bulunamadı.");
    }
  };
 
  const handleRowClick1 = (userId) => {
    const selectedUserData = kullanicilar.find((user) => user.id === userId);
    if (selectedUserData) {
      setSelectUser(selectedUserData);
      setsilmePop(true);      
    } else {
      console.error("Kullanıcı bulunamadı.");
    }
  };

  const PopupContent = () => {
    const [updatedUser, setUpdatedUser] = useState({
      isim: selectedUser?.isim || "",
      soyisim: selectedUser?.soyisim || "",
      telNo: selectedUser?.telNo || "",
      eposta: selectedUser?.eposta || "",
    });
    const handleUpdate = async () => {
      try {
        const userDocRef = doc(firestore, 'users', selectedUser.id);
        await updateDoc(userDocRef, updatedUser);
        setSelectedUser(null);
        alert("Güncelleme Başarılı..");
        setisEditPopupOpen(false);
        fetchAndSetKullanicilar();
      } catch (error) {
        console.log("Hataaa", error);
      }
    };
  
    const handleChange = (field, value) => {
      setUpdatedUser((prevData) => ({
        ...prevData,
        [field]: value,
       
      }));
      console.log("Field", field)
      console.log("Value:" , value)
    };
    return (
      <div className='modal1'>
        
        <form className='modal-form'>
        <h3>Bilgileri Düzenle</h3>
          <h3 onClick={() => { console.log("Kapatıldı"); setisEditPopupOpen(false); setSelectedUser(null)}} id="modal-kapat">x</h3>
          {selectedUser &&  (
            <>
              <label>
              İsim:{" "}
              <input
                type="text"
                name="isim"
                value={updatedUser.isim}
                onChange={(e) => handleChange("isim", e.target.value)}
              />
            </label>
            <label>
              Soyisim:{" "}
              <input
                type="text"
                name="soyisim"
                value={updatedUser.soyisim}
                onChange={(e) => handleChange("soyisim", e.target.value)}
              />
            </label>
            <label>
              Tel No:{" "}
              <input
                type="number"
                name="telNo"
                value={updatedUser.telNo}
                onChange={(e) => handleChange("telNo", e.target.value)}
              />
            </label>
            <label>
              Eposta:{" "}
              <input
                type="text"
                name="eposta"
                value={updatedUser.eposta}
                onChange={(e) => handleChange("eposta", e.target.value)}
              />

            </label>
              
            </>
          )}
           <>
           <button id='kaydet'  type="button" onClick={handleUpdate}>Kaydet</button>
                  </>
          
        </form>
      </div>
    );
  };
  
  const silmepop = ()=>{
      const handleDelete = async () => {
       
        try {
          
          if (selectUser) {
            console.log("Seçili Kullanıcı:", selectUser);
            const userDocRef = doc(firestore, 'users', selectUser.id);
            await deleteDoc(userDocRef);
            console.log("Silme gerçekleşti");
            fetchAndSetKullanicilar();
            setsilmePop(false);
            alert("Silme İşlemi Başarıyla Gerçekleşti")
          } else {
            console.log("Seçili kullanıcı yok, silme işlemi iptal edildi.");
          }
        } catch (error) {
          console.log("Hata", error);
        }
      };
  
      return (
        <div className='modal1'>
          <form className='modal-form'>
            <h3> Silmek istediğinize emin misiniz ? </h3>
            <button id='evet' type="button" onClick={ () => handleDelete()}>Evet</button>
            <button id='iptal' type="button" onClick={() => setsilmePop(false)}>İptal</button>
          </form>
        </div>
      )
    
  }
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setTemporaryData({});
    setisEditPopupOpen(false); 
  };

  const handleUpdate = async (userId) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, temporaryData);
      setEditingUserId(null);
      setTemporaryData({});
      alert("Güncelleme Başarılı..");
      fetchAndSetKullanicilar();

    } catch (error) {
      console.log("Hataaa", error);
    }
  };
  const fetchAndSetKullanicilar = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setKullanicilar(users);
      console.log("Veriler Geliyor", users);
    } catch (error) {
      console.error('Firestore dan veri çekerken hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchAndSetKullanicilar();
  }, [])
  
 
 
  useEffect(() => {
    const updatedKullanicilar = kullanicilar.filter((kullanici) =>
      `${kullanici.isim.toLowerCase()} ${kullanici.soyisim.toLowerCase()}`.includes(searchTerm.toLowerCase())
    );
    setFilteredKullanicilar(updatedKullanicilar);
  }, [searchTerm, kullanicilar ]);

  return (
    <div>
      <div className='header'>
      

        <a className='logo'>Kişi Kayıt</a>
        <div className='header-right'>
          <a className='active' href="#">Anasayfa</a>
          <a href="#">Kayıtlı Kişiler</a>
          <a href="#">Çıkış</a>
        </div>
        <div className='arama-cubugu'>       
        <input
        placeholder='Arama'
          type="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="search" className='arama-button' >
          <FontAwesomeIcon icon={faSearch}/>
        </label>
      </div>
      </div>

      <table id='customers'>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Tel No</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {filteredKullanicilar.map((kullanici) => (
            <tr key= {kullanici.id}  >
              <td>
              {kullanici.isim}
              </td>
              <td>
                {kullanici.soyisim}
              </td>
              <td>{kullanici.telNo}</td>
              <td>
                
                 { kullanici.eposta}
              </td>
              <td>
                {editingUserId === kullanici.id ? (
                  <>
                    <button  onClick={() => handleUpdate(kullanici.id)}>Kaydet</button>
                    <button onClick={handleCancelEdit}>İptal</button>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon 
                      onClick={() => handleRowClick(kullanici.id)}
                      icon={faEdit}
                    />
                    {isEditPopupOpen && <PopupContent />}
                    <FontAwesomeIcon
                      onClick={() => handleRowClick1(kullanici.id)}
                      icon={faTrash}
                    />
                   {silmePop && silmepop()}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Link to={'/kisiekle'} className='button1'>Kişi Ekle</Link>

     
      

    </div>
    
  );
};

export default Home;
