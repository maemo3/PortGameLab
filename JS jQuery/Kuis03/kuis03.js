function cekKelayakanRumah(kawasan, luasTanah, luasBangunan, fasilitas) {
    // Cek kawasan
    if (kawasan.tidakRawanBanjir && kawasan.tidakRawanLongsor && !kawasan.kawasanIndustri) {
      // Cek luas tanah dan luas bangunan
      if (luasTanah >= 800 && luasBangunan >= 400) {
        // Cek fasilitas
        if (fasilitas.kolamRenang && fasilitas.parkirLuas && fasilitas.kebunBelakang) {
          return "Rumah memenuhi semua kriteria.";
        } else {
          return "Rumah tidak memenuhi kriteria fasilitas.";
        }
      } else {
        return "Rumah tidak memenuhi kriteria luas tanah dan luas bangunan.";
      }
    } else {
      return "Rumah tidak memenuhi kriteria kawasan.";
    }
  }
  
  // Contoh pemanggilan fungsi
  const kawasan = {
    tidakRawanBanjir: true,
    tidakRawanLongsor: true,
    kawasanIndustri: false
  };
  
  const luasTanah = 900;
  const luasBangunan = 450;
  
  const fasilitas = {
    kolamRenang: true,
    parkirLuas: true,
    kebunBelakang: true
  };
  
  const hasilCek = cekKelayakanRumah(kawasan, luasTanah, luasBangunan, fasilitas);
  console.log(hasilCek);
  
