import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

export const KullaniciContext = createContext();

export const KullaniciProvider = () => {
  // const [kullanicilar, setKullanicilar] = useState([]);

  // const fetchAndSetKullanicilar = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(firestore, 'users'));
  //     const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setKullanicilar(users);
  //     console.log("Veriler Geliyor", users);
  //   } catch (error) {
  //     console.error('Firestore dan veri çekerken hata oluştu:', error);
  //   }
  // };

  // // Sadece sayfa yüklendiğinde veya bağımlılıklar değiştiğinde çalışır
  // useEffect(() => {
  //   return(
  //   fetchAndSetKullanicilar())
  // }, [kullanicilar]); // Boş bağımlılık dizisi, sadece sayfa yüklendiğinde çalışmasını sağlar

  // const contextValues = {
  //   kullanicilar,
  //   setKullanicilar,
  //   fetchAndSetKullanicilar,
  // };

  return (
    <KullaniciContext.Provider >
    </KullaniciContext.Provider>
  );
};
