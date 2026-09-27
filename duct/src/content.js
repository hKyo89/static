export const partTree = [{
  id: "complete-system",
  children: [
    {
      id: "hood",
      children: [
        {
          id: "side-panels",
          children: ["left-side", "left-flange", "cable-duct", "right-side", "right-flange"]
        },
        { id: "top-panel", children: ["top-cover", "exhaust-curb"] },
        {
          id: "back-panel",
          children: ["rear-panel", { id: "mounting-rails", children: ["upper-rail", "lower-rail"] }]
        },
        {
          id: "bottom-panels",
          children: [
            "rear-bottom", "rear-grille-lip", "l5-support", "front-face",
            "front-grille-lip", "light-panel",
            { id: "led-lights", children: ["led-1", "led-2", "led-3"] }
          ]
        },
        {
          id: "removable-grilles",
          children: ["removable-grille-1", "removable-grille-2", "removable-grille-3"]
        }
      ]
    },
    {
      id: "duct-system",
      children: [
        { id: "ceiling-route", children: ["straight-1", "elbow-1", "straight-2", "elbow-2", "straight-3"] },
        { id: "fan-chain", children: ["transition-1", "fan", "transition-2"] },
        { id: "shaft-rise", children: ["elbow-3", "straight-4a", "straight-4b", "straight-4c", "straight-4d"] },
        { id: "outlet", children: ["elbow-4", "rain-hood"] }
      ]
    },
    {
      id: "building-context",
      children: ["room-structure", "ceiling-roof", "shaft-structure", "grc-enclosure", "glass-roof"]
    }
  ]
}];

export const uiText = {
  id: {
    viewerTitle: "Viewer sistem exhaust Opsi D",
    viewerHint: "Periksa hood, duct, kipas, shaft, dan outlet",
    displayTitle: "Tampilan",
    colourParts: "Warna komponen",
    dimensionsAngles: "Dimensi dan sudut",
    points: "Titik",
    showAll: "Tampilkan semua",
    hideAll: "Sembunyikan semua",
    partsTitle: "Komponen",
    activeComponent: "Komponen aktif",
    description: "Deskripsi",
    materials: "Material",
    measurements: "Ukuran",
    angles: "Sudut",
    instructions: "Petunjuk",
    navigation: "Navigasi",
    rotate: "Putar: tarik",
    pan: "Geser: klik kanan + tarik",
    zoom: "Zoom: roda gulir / cubit",
    focus: "Fokus: pilih ◎",
    hide: "Sembunyikan",
    show: "Tampilkan",
    isolate: "Isolasi dan fokus",
    completeCaption: "Sistem exhaust lengkap — Opsi D"
  },
  en: {
    viewerTitle: "Option D exhaust-system viewer",
    viewerHint: "Inspect the hood, duct, fan, shaft, and outlet",
    displayTitle: "Display",
    colourParts: "Colour-coded parts",
    dimensionsAngles: "Dimensions and angles",
    points: "Points",
    showAll: "Show all",
    hideAll: "Hide all",
    partsTitle: "Parts",
    activeComponent: "Active component",
    description: "Description",
    materials: "Materials",
    measurements: "Measurements",
    angles: "Angles",
    instructions: "Instructions",
    navigation: "Navigation",
    rotate: "Rotate: drag",
    pan: "Pan: right-click + drag",
    zoom: "Zoom: wheel / pinch",
    focus: "Focus: select ◎",
    hide: "Hide",
    show: "Show",
    isolate: "Isolate and focus",
    completeCaption: "Complete exhaust system — Option D"
  }
};

export const partLabels = {
  id: {
    "complete-system": "Sistem exhaust lengkap",
    hood: "Hood",
    "side-panels": "Panel samping",
    "left-side": "Panel samping kiri",
    "left-flange": "Flange lipat kiri",
    "right-side": "Panel samping kanan",
    "right-flange": "Flange lipat kanan",
    "top-panel": "Panel atas",
    "top-cover": "Pelat penutup atas",
    "exhaust-curb": "Curb exhaust",
    "back-panel": "Panel belakang",
    "rear-panel": "Pelat dinding belakang",
    "cable-duct": "Duct kabel 20 × 20",
    "mounting-rails": "Rel pemasangan",
    "upper-rail": "Rel dinding atas",
    "lower-rail": "Rel dinding bawah",
    "bottom-panels": "Panel bawah",
    "rear-bottom": "Pelat bawah belakang",
    "rear-grille-lip": "Dudukan grille belakang",
    "l5-support": "Dudukan L5–R5",
    "front-face": "Muka vertikal depan",
    "front-grille-lip": "Dudukan grille depan",
    "light-panel": "Panel pembawa LED",
    "led-lights": "Lampu LED",
    "led-1": "LED 1",
    "led-2": "LED 2",
    "led-3": "LED 3",
    "removable-grilles": "Grille lepas-pasang",
    "removable-grille-1": "Grille lepas-pasang 1",
    "removable-grille-2": "Grille lepas-pasang 2",
    "removable-grille-3": "Grille lepas-pasang 3"
    ,"duct-system": "Sistem ducting"
    ,"ceiling-route": "Rute di atas plafon"
    ,"fan-chain": "Transisi dan kipas"
    ,"shaft-rise": "Saluran tegak shaft"
    ,outlet: "Keluaran luar ruang"
    ,"straight-1": "Lurus 1"
    ,"elbow-1": "Siku 1"
    ,"straight-2": "Lurus 2"
    ,"elbow-2": "Siku 2"
    ,"straight-3": "Lurus 3"
    ,"transition-1": "Transisi 1"
    ,fan: "Kipas CKE"
    ,"transition-2": "Transisi 2"
    ,"elbow-3": "Siku 3"
    ,"straight-4a": "Lurus 4 — bagian 1"
    ,"straight-4b": "Lurus 4 — bagian 2"
    ,"straight-4c": "Lurus 4 — bagian 3"
    ,"straight-4d": "Lurus 4 — bagian 4"
    ,"elbow-4": "Siku 4"
    ,"rain-hood": "Tudung hujan"
    ,"building-context": "Konteks bangunan"
    ,"room-structure": "Dinding dan lantai"
    ,"ceiling-roof": "Plafon dan pelat atap"
    ,"shaft-structure": "Dinding shaft"
    ,"grc-enclosure": "Penutup GRC 19 cm"
    ,"glass-roof": "Atap kaca"
  },
  en: {
    "complete-system": "Complete exhaust system",
    hood: "Hood",
    "side-panels": "Side panels",
    "left-side": "Left side plate",
    "left-flange": "Left folded flange",
    "right-side": "Right side plate",
    "right-flange": "Right folded flange",
    "top-panel": "Top panel",
    "top-cover": "Top cover plate",
    "exhaust-curb": "Exhaust curb",
    "back-panel": "Back panel",
    "rear-panel": "Rear wall plate",
    "cable-duct": "20 × 20 cable duct",
    "mounting-rails": "Mounting rails",
    "upper-rail": "Upper wall rail",
    "lower-rail": "Lower wall rail",
    "bottom-panels": "Bottom panels",
    "rear-bottom": "Rear bottom plate",
    "rear-grille-lip": "Rear grille support lip",
    "l5-support": "L5–R5 support",
    "front-face": "Front vertical face",
    "front-grille-lip": "Front grille support lip",
    "light-panel": "LED carrier panel",
    "led-lights": "LED lights",
    "led-1": "LED 1",
    "led-2": "LED 2",
    "led-3": "LED 3",
    "removable-grilles": "Removable grilles",
    "removable-grille-1": "Removable grille 1",
    "removable-grille-2": "Removable grille 2",
    "removable-grille-3": "Removable grille 3",
    "duct-system": "Duct system",
    "ceiling-route": "Above-ceiling route",
    "fan-chain": "Transitions and fan",
    "shaft-rise": "Shaft riser",
    outlet: "Outdoor outlet",
    "straight-1": "Straight 1",
    "elbow-1": "Elbow 1",
    "straight-2": "Straight 2",
    "elbow-2": "Elbow 2",
    "straight-3": "Straight 3",
    "transition-1": "Transition 1",
    fan: "CKE fan",
    "transition-2": "Transition 2",
    "elbow-3": "Elbow 3",
    "straight-4a": "Straight 4 — section 1",
    "straight-4b": "Straight 4 — section 2",
    "straight-4c": "Straight 4 — section 3",
    "straight-4d": "Straight 4 — section 4",
    "elbow-4": "Elbow 4",
    "rain-hood": "Rain hood",
    "building-context": "Building context",
    "room-structure": "Walls and floor",
    "ceiling-roof": "Ceiling and roof slab",
    "shaft-structure": "Shaft walls",
    "grc-enclosure": "19 cm GRC enclosure",
    "glass-roof": "Glass roof"
  }
};

export const partInfoKey = {
  "left-side": "side-panels",
  "left-flange": "side-panels",
  "right-side": "side-panels",
  "right-flange": "side-panels",
  "top-cover": "top-panel",
  "exhaust-curb": "top-panel",
  "rear-panel": "back-panel",
  "cable-duct": "side-panels",
  "upper-rail": "mounting-rails",
  "lower-rail": "mounting-rails",
  "rear-bottom": "bottom-panels",
  "rear-grille-lip": "bottom-panels",
  "l5-support": "bottom-panels",
  "front-face": "bottom-panels",
  "front-grille-lip": "bottom-panels",
  "light-panel": "bottom-panels",
  "led-1": "led-lights",
  "led-2": "led-lights",
  "led-3": "led-lights",
  "removable-grille-1": "removable-grilles",
  "removable-grille-2": "removable-grilles",
  "removable-grille-3": "removable-grilles"
};

Object.assign(partInfoKey, {
  "room-structure": "building-context",
  "ceiling-roof": "building-context",
  "shaft-structure": "building-context",
  "grc-enclosure": "building-context",
  "glass-roof": "building-context"
});

export const infoContent = {
  id: {
    hood: {
      description: "Assembly hood lengkap untuk menangkap asap masak, menahan grille lepas-pasang, dan menyalurkan udara ke bukaan exhaust atas.",
      materials: ["Stainless steel tebal 1 mm", "Rel pemasangan baja/stainless 3 mm", "Tiga lampu LED Ø30 mm"],
      measurements: ["Lebar keseluruhan 1.500 mm", "Kedalaman 600 mm", "Tinggi belakang 300 mm; tinggi depan 100 mm", "Bukaan exhaust 350 × 150 mm"],
      angles: ["Kemiringan utama 21,8°", "Sudut panel 111,8° dan 158,2°"],
      instructions: ["Periksa semua sambungan pelat sebelum fabrikasi.", "Pastikan posisi exhaust, lampu, grille, dan rel sesuai gambar kerja."]
    },
    "side-panels": {
      description: "Sepasang pelat samping cermin yang menentukan profil, kemiringan, dan kedalaman hood.",
      materials: ["Stainless steel tebal 1 mm", "Flange integral selebar 30 mm"],
      measurements: ["Panjang atas 600 mm", "Tinggi belakang 300 mm", "Tinggi depan 100 mm", "Sisi miring 538,5 mm"],
      angles: ["Kemiringan 21,8°", "Sudut dalam 111,8° dan 158,2°"],
      instructions: ["Tekuk flange ke arah dalam.", "Jaga kedua panel tetap cermin dan sejajar."]
    },
    "top-panel": {
      description: "Pelat atas menutup hood dan membawa curb exhaust persegi panjang.",
      materials: ["Stainless steel tebal 1 mm", "Curb exhaust setinggi 30 mm"],
      measurements: ["Bukaan exhaust 350 × 150 mm", "Jarak bukaan dari belakang 30 mm", "Bukaan dipusatkan pada lebar hood"],
      angles: ["Semua tekukan curb 90°"],
      instructions: ["Pastikan bukaan benar-benar tembus.", "Rapatkan sambungan curb agar tidak bocor minyak atau udara."]
    },
    "back-panel": {
      description: "Panel belakang menutup sisi dinding, membawa duct kabel, dan menerima pola lubang anchor dari kedua rel.",
      materials: ["Stainless steel tebal 1 mm", "Duct kabel 20 × 20 mm"],
      measurements: ["Lebar 1.500 mm", "Tinggi 300 mm", "Delapan lubang anchor sejajar dengan rel"],
      angles: ["Panel belakang tegak 90° terhadap panel atas"],
      instructions: ["Pastikan lubang panel tepat segaris dengan lubang rel.", "Jauhkan jalur kabel dari tepi tajam dan lubang anchor."]
    },
    "mounting-rails": {
      description: "Dua rel eksternal menyalurkan beban hood ke dinding bata merah melalui anchor.",
      materials: ["Rel baja/stainless 1.400 × 40 × 3 mm", "Chemical anchor M10 dengan mesh sleeve untuk bata merah"],
      measurements: ["Empat lubang per rel", "Pusat lubang 100, 500, 900, dan 1.300 mm dari ujung rel", "Total delapan titik anchor"],
      angles: ["Rel dipasang horizontal dan sejajar"],
      instructions: ["Jangan memasang anchor pada nat mortar.", "Diameter bor dan kedalaman efektif mengikuti produk anchor.", "Lakukan uji tarik lapangan minimal pada satu titik."]
    },
    "bottom-panels": {
      description: "Rangkaian pelat bawah membentuk bidang masuk udara, dudukan grille, muka depan, dan panel lampu.",
      materials: ["Stainless steel tebal 1 mm", "Dudukan grille terintegrasi"],
      measurements: ["Panel lampu berada 100 mm dari depan dan turun 50 mm", "Dudukan L5–R5 setinggi 30 mm"],
      angles: ["Bidang grille mengikuti kemiringan utama 21,8°", "Lip dan muka depan ditekuk 90°"],
      instructions: ["Pastikan ketiga grille dapat dilepas tanpa baut.", "Hilangkan tepi tajam pada area servis dan lampu."]
    },
    "led-lights": {
      description: "Tiga lampu LED berada pada panel bawah depan dan tetap ditampilkan kuning pada semua mode warna.",
      materials: ["Tiga lampu LED Ø30 mm", "Kabel melalui duct 20 × 20 mm"],
      measurements: ["Pusat lampu: 250, 750, dan 1.250 mm dari sisi kiri", "Jarak antarpusat 500 mm"],
      angles: ["Lampu tegak lurus terhadap panel pembawa"],
      instructions: ["Gunakan fitting tahan panas dan mudah diservis.", "Pastikan kabel tidak menyentuh tepi pelat."]
    },
    "removable-grilles": {
      description: "Tiga grille baffle lepas-pasang menutup bidang masuk udara dari sisi ke sisi.",
      materials: ["Stainless steel", "Rangka perimeter dan bilah baffle"],
      measurements: ["Masing-masing 490 × 470 × 30 mm", "Tiga unit menutup lebar hood"],
      angles: ["Grille mengikuti kemiringan dudukan 21,8°"],
      instructions: ["Pasang tanpa baut agar mudah dicuci.", "Pastikan seluruh tepi grille bertumpu pada dudukan depan dan belakang."]
    }
  }
};

infoContent.en = {
  hood: {
    description: "Complete hood assembly for capturing cooking fumes, supporting removable grilles, and directing airflow to the top exhaust opening.",
    materials: ["1 mm stainless steel", "3 mm steel/stainless mounting rails", "Three Ø30 mm LED lights"],
    measurements: ["1,500 mm overall width", "600 mm depth", "300 mm rear height; 100 mm front height", "350 × 150 mm exhaust opening"],
    angles: ["21.8° principal slope", "111.8° and 158.2° panel angles"],
    instructions: ["Check every sheet-metal joint before fabrication.", "Verify the exhaust, lights, grilles, and mounting rails against the working drawings."]
  },
  "side-panels": {
    description: "Mirrored side plates defining the hood profile, slope, and depth.",
    materials: ["1 mm stainless steel", "Integral 30 mm flange"],
    measurements: ["600 mm top edge", "300 mm rear height", "100 mm front height", "538.5 mm sloping edge"],
    angles: ["21.8° slope", "111.8° and 158.2° internal angles"],
    instructions: ["Fold the flange inward.", "Keep both panels mirrored and aligned."]
  },
  "top-panel": {
    description: "The top plate closes the hood and carries the rectangular exhaust curb.",
    materials: ["1 mm stainless steel", "30 mm high exhaust curb"],
    measurements: ["350 × 150 mm exhaust opening", "30 mm rear setback", "Opening centred across the hood width"],
    angles: ["All curb folds are 90°"],
    instructions: ["Ensure the opening is fully cut through.", "Seal the curb joints against grease and air leakage."]
  },
  "back-panel": {
    description: "The rear panel closes the wall side, carries the cable duct, and receives the anchor-hole pattern from both rails.",
    materials: ["1 mm stainless steel", "20 × 20 mm cable duct"],
    measurements: ["1,500 mm width", "300 mm height", "Eight anchor holes aligned with the rails"],
    angles: ["Rear panel is 90° to the top panel"],
    instructions: ["Align the panel holes precisely with the rail holes.", "Keep wiring clear of sharp edges and anchor holes."]
  },
  "mounting-rails": {
    description: "Two external rails transfer the hood load to the red-brick wall through anchors.",
    materials: ["1,400 × 40 × 3 mm steel/stainless rail", "M10 chemical anchors with mesh sleeves for red brick"],
    measurements: ["Four holes per rail", "Hole centres at 100, 500, 900, and 1,300 mm from the rail end", "Eight anchor points total"],
    angles: ["Install both rails level and parallel"],
    instructions: ["Do not anchor into mortar joints.", "Follow the anchor product's drill diameter and embedment depth.", "Perform at least one site pull test."]
  },
  "bottom-panels": {
    description: "The lower sheet-metal assembly forms the air-entry surface, grille supports, front face, and light panel.",
    materials: ["1 mm stainless steel", "Integrated grille supports"],
    measurements: ["Light panel is 100 mm behind the front and 50 mm down", "L5–R5 support is 30 mm high"],
    angles: ["Grille plane follows the 21.8° main slope", "Support lips and front face fold at 90°"],
    instructions: ["Confirm all three grilles can be removed without fasteners.", "Deburr all service and lighting edges."]
  },
  "led-lights": {
    description: "Three LED lights sit in the lower front panel and remain yellow in every colour mode.",
    materials: ["Three Ø30 mm LED lights", "Wiring routed through a 20 × 20 mm duct"],
    measurements: ["Light centres at 250, 750, and 1,250 mm from the left", "500 mm centre spacing"],
    angles: ["Lights are normal to the carrier panel"],
    instructions: ["Use heat-resistant, serviceable fittings.", "Keep wiring clear of sheet-metal edges."]
  },
  "removable-grilles": {
    description: "Three removable baffle grilles cover the air-entry area from side to side.",
    materials: ["Stainless steel", "Perimeter frame with baffle blades"],
    measurements: ["Each grille is 490 × 470 × 30 mm", "Three units span the hood width"],
    angles: ["Grilles follow the 21.8° support slope"],
    instructions: ["Install without bolts for easy cleaning.", "Seat every grille edge on the front and rear supports."]
  }
};

const ductPartsId = {
  "complete-system": ["Rangkaian lengkap Opsi D dari hood sampai tudung hujan, ditampilkan bersama konteks bangunan.", ["Hood stainless steel 1 mm", "Duct persegi panjang dan transisi pelat 0,5 mm", "Flange integral 30 mm", "Kipas CKE CI-CDI250AZ-NO"], ["Hood 1.500 × 600 mm", "Duct utama 350 × 150 mm", "Shaft bersih 840 × 380 mm", "Bawah kotak tudung hujan +4.940 mm dari dasar shaft"], ["Semua siku 90°", "Kemiringan hood 21,8°"], ["Survei semua datum bangunan sebelum fabrikasi.", "Jaga akses ke kipas dan semua sambungan sampai pengujian selesai."]],
  "duct-system": ["Rangkaian duct dari curb hood menuju outlet luar melalui plafon dan shaft.", ["Pelat galvanis/stainless 0,5 mm", "Flange integral 30 mm pada sambungan persegi"], ["Penampang nominal 350 × 150 mm", "Leher bulat Ø250 mm pada kipas"], ["Empat siku 90°"], ["Segel semua flange dan sambungan.", "Sangga duct secara mandiri; jangan membebani hood atau kipas."]],
  "ceiling-route": ["Rute awal dari hood, berbelok ke kiri lalu maju menuju kipas.", ["Duct 350 × 150 / 150 × 350 mm", "Flange integral 30 mm"], ["Lurus 1: 715 mm", "Lurus 2: 245 mm", "Lurus 3: 1.025 mm"], ["Siku 1 dan 2: 90°"], ["Verifikasi clearance plafon, lampu, dan dinding sebelum dipasang."]],
  "fan-chain": ["Dua transisi menghubungkan duct persegi dengan kipas inline Ø250 mm.", ["Transisi pelat 0,5 mm", "Kipas CKE CI-CDI250AZ-NO"], ["Badan transisi masing-masing 250 mm", "Leher silinder 40 mm", "Kipas total 205 mm"], ["Semua pusat sambungan segaris"], ["Kipas adalah barang jadi; jangan difabrikasi.", "Sediakan akses servis dan dudukan mandiri."]],
  "shaft-rise": ["Siku masuk shaft dan empat bagian duct tegak berflange.", ["Duct 350 × 150 mm", "Flange integral 30 mm"], ["Bagian 1: 1.200 mm", "Bagian 2: 1.200 mm", "Bagian 3: 1.200 mm", "Bagian 4: 615 mm"], ["Siku masuk shaft 90°"], ["Pasang penyangga pada struktur shaft.", "Baut dan segel setiap sambungan flange."]],
  outlet: ["Siku atas mengarahkan aliran ke tudung hujan melalui GRC.", ["Duct 350 × 150 mm", "Tudung hujan berongga"], ["Tudung: 350 lebar × 150 tinggi", "Kedalaman bawah 200; atas 300 mm", "Bawah kotak +4.940 mm dari dasar shaft"], ["Siku 4: 90°", "Muka tudung meruncing"], ["Ujung keluar tanpa flange.", "Pasang kisi hujan yang tidak terlalu rapat."]],
  "straight-1": ["Duct tegak dari curb hood menuju Siku 1.", ["Pelat 0,5 mm", "Dua flange integral 30 mm"], ["350 × 150 mm", "Tinggi 715 mm", "Flange luar 410 × 210 mm"], ["Tegak lurus terhadap hood"], ["Flange adalah bagian dari Lurus 1.", "Cocokkan lubang hood sebelum pemasangan."]],
  "elbow-1": ["Siku pertama membelokkan aliran dari vertikal ke arah kiri.", ["Pelat 0,5 mm", "Flange 30 mm di kedua ujung"], ["Penampang 350 × 150 mm", "Radius dalam 100; luar 450 mm"], ["Belokan 90°"], ["Gunakan pelat lengkung menerus."]],
  "straight-2": ["Duct pendek mendatar di antara Siku 1 dan Siku 2.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 150 × 350 mm", "Panjang bersih 245 mm"], ["Mendatar"], ["Ukur panjang bersih antar muka sambungan."]],
  "elbow-2": ["Siku kedua mengubah arah kiri menjadi maju menuju shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 150 × 350 mm", "Radius dalam 200; luar 350 mm"], ["Belokan 90°"], ["Pertahankan penampang aliran tanpa penyempitan."]],
  "straight-3": ["Duct mendatar menuju Transisi 1.", ["Pelat 0,5 mm", "Flange 30 mm"], ["150 × 350 mm", "Kedalaman 1.025 mm"], ["Mendatar"], ["Jaga flange bebas dari dinding shaft."]],
  "transition-1": ["Transisi dari 150 × 350 mm menjadi Ø250 mm sebelum kipas.", ["Pelat 0,5 mm", "Flange hanya pada sisi persegi"], ["Badan 250 mm", "Leher Ø250 × 40 mm"], ["Sumbu lurus"], ["Ujung bulat tidak memakai flange persegi."]],
  fan: ["Kipas sentrifugal duct inline yang sudah dibeli.", ["CKE CI-CDI250AZ-NO", "Collar Ø250 mm"], ["Lebar keseluruhan 380 mm", "Muka 349; badan 335 mm", "Panjang total 205 mm", "Collar 25 mm tiap sisi"], ["Sumbu horizontal"], ["Jangan dibuat oleh fabrikator duct.", "Terminal listrik di kanan; dudukan berada di atas."]],
  "transition-2": ["Transisi setelah kipas dari Ø250 mm ke 350 × 150 mm.", ["Pelat 0,5 mm", "Flange hanya pada sisi persegi"], ["Leher Ø250 × 40 mm", "Badan 250 mm"], ["Sumbu lurus"], ["Ujung bulat awal tanpa flange persegi."]],
  "elbow-3": ["Siku masuk shaft mengubah duct mendatar menjadi tegak.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 mm", "Radius dalam 200; luar 350 mm"], ["Belokan 90°"], ["Flange atas berada 525 mm di atas dasar shaft."]],
  "straight-4a": ["Bagian pertama duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +525; atas +1.725 mm"], ["Vertikal"], ["Pasang penyangga pada struktur shaft."]],
  "straight-4b": ["Bagian kedua duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +1.725; atas +2.925 mm"], ["Vertikal"], ["Baut dan segel sambungan flange."]],
  "straight-4c": ["Bagian ketiga duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +2.925; atas +4.125 mm"], ["Vertikal"], ["Baut dan segel sambungan flange."]],
  "straight-4d": ["Bagian terakhir duct tegak sebelum siku outlet.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 615 mm", "Bawah +4.125; atas +4.740 mm"], ["Vertikal"], ["Panjang menjaga flange atas tidak menyentuh kaca."]],
  "elbow-4": ["Siku atas mengarahkan aliran keluar melalui GRC.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 mm", "Radius dalam 200; luar 350 mm", "Flange keluar 410 × 210 mm"], ["Belokan 90°"], ["Bukaan GRC terlihat 410 × 190 mm."]],
  "rain-hood": ["Outlet berongga dan meruncing untuk mengurangi masuknya hujan.", ["Pelat 0,5 mm", "Flange 30 mm hanya pada inlet"], ["350 × 150 mm", "Kedalaman bawah 200; atas 300 mm", "Bawah kotak +4.940 mm"], ["Muka keluar miring"], ["Tanpa flange pada ujung keluar.", "Segel pertemuan dengan GRC."]],
  "building-context": ["Konteks bangunan dipakai untuk memeriksa clearance sistem, bukan bagian fabrikasi duct.", ["Dinding/shaft", "GRC", "Kaca", "Plafon dan pelat atap"], ["Bukaan shaft bersih 840 × 380 mm", "GRC tinggi 190 mm", "Kaca 940 × 580 × 10 mm"], ["Semua bidang bangunan mengikuti datum proyek"], ["Verifikasi lapangan sebelum pemotongan.", "Jangan memotong struktur tanpa persetujuan engineer."]]
};

for (const [key, [description, materials, measurements, angles, instructions]] of Object.entries(ductPartsId)) {
  infoContent.id[key] = { description, materials, measurements, angles, instructions };
  infoContent.en[key] = {
    description,
    materials,
    measurements,
    angles,
    instructions
  };
}

const ductPartsEn = {
  "complete-system": ["Complete Option D route from the hood to the rain hood, shown with its building context.", ["1 mm stainless-steel hood", "0.5 mm rectangular duct and transitions", "30 mm integral flanges", "CKE CI-CDI250AZ-NO fan"], ["1,500 × 600 mm hood", "350 × 150 mm main duct", "840 × 380 mm clear shaft", "Rain-hood box bottom +4,940 mm from shaft base"], ["All elbows 90°", "Hood slope 21.8°"], ["Survey every building datum before fabrication.", "Keep the fan and every joint accessible until testing is complete."]],
  "duct-system": ["The complete duct route from the hood curb to the outdoor outlet through the ceiling and shaft.", ["0.5 mm galvanized/stainless sheet", "30 mm integral flanges at rectangular joints"], ["350 × 150 mm nominal rectangular section", "Ø250 mm fan collars"], ["Four 90° elbows"], ["Seal every flange and joint.", "Support the duct independently from the hood and fan."]],
  "ceiling-route": ["The initial route rises from the hood, turns left, then runs forward to the fan.", ["350 × 150 / 150 × 350 mm duct", "30 mm integral flanges"], ["Straight 1: 715 mm", "Straight 2: 245 mm", "Straight 3: 1,025 mm"], ["Elbows 1 and 2: 90°"], ["Verify ceiling, light, and wall clearances before installation."]],
  "fan-chain": ["Two transitions connect the rectangular duct to the Ø250 mm inline fan.", ["0.5 mm transition sheet", "CKE CI-CDI250AZ-NO fan"], ["Each transition body: 250 mm", "Cylindrical collar: 40 mm", "Fan overall depth: 205 mm"], ["All connection axes are aligned"], ["The fan is purchased equipment; do not fabricate it.", "Provide independent support and service access."]],
  "shaft-rise": ["The shaft-entry elbow and four flanged vertical duct sections.", ["350 × 150 mm duct", "30 mm integral flanges"], ["Section 1: 1,200 mm", "Section 2: 1,200 mm", "Section 3: 1,200 mm", "Section 4: 615 mm"], ["Shaft-entry elbow: 90°"], ["Support the riser from the shaft structure.", "Bolt and seal every flange joint."]],
  outlet: ["The upper elbow discharges through the GRC enclosure into the rain hood.", ["350 × 150 mm duct", "Hollow tapered rain hood"], ["Rain hood: 350 × 150 mm", "Bottom depth 200; top depth 300 mm", "Box bottom +4,940 mm from shaft base"], ["Elbow 4: 90°", "Tapered outlet face"], ["No flange at the open outlet.", "Fit a free-flowing rain grille."]],
  "straight-1": ["Vertical duct from the hood curb to Elbow 1.", ["0.5 mm sheet", "Two 30 mm integral flanges with 12 holes each"], ["350 × 150 mm", "715 mm high", "410 × 210 mm flange envelope"], ["Normal to the hood top"], ["The flanges belong to Straight 1.", "Match the hood opening before installation."]],
  "elbow-1": ["The first elbow turns the route from vertical toward the left.", ["0.5 mm sheet", "30 mm flanges with fastener holes"], ["350 × 150 mm", "100 mm throat radius; 450 mm outer radius"], ["90° bend"], ["Form the curved sheets continuously."]],
  "straight-2": ["Short horizontal duct between Elbows 1 and 2.", ["0.5 mm sheet", "30 mm flanges"], ["150 × 350 mm section", "245 mm clear length"], ["Horizontal"], ["Measure the clear length between connection faces."]],
  "elbow-2": ["The second elbow redirects the leftward run toward the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["150 × 350 mm", "200 mm throat radius; 350 mm outer radius"], ["90° bend"], ["Maintain the full airflow section."]],
  "straight-3": ["Horizontal duct leading to Transition 1.", ["0.5 mm sheet", "30 mm flanges"], ["150 × 350 mm", "1,025 mm depth"], ["Horizontal"], ["Keep the flange clear of the shaft wall."]],
  "transition-1": ["Transition from 150 × 350 mm rectangular to Ø250 mm round before the fan.", ["0.5 mm sheet", "Flange only at the rectangular end"], ["250 mm body", "Ø250 × 40 mm collar"], ["Concentric axis"], ["Do not add a rectangular flange to the round end."]],
  fan: ["Purchased centrifugal inline duct fan.", ["CKE CI-CDI250AZ-NO", "Ø250 mm collars"], ["380 mm overall width", "349 mm face; 335 mm body", "205 mm total depth", "25 mm collar at each end"], ["Horizontal axis"], ["Do not fabricate the fan.", "Electrical terminal is on the right; support foot is above."]],
  "transition-2": ["Transition after the fan from Ø250 mm round to 350 × 150 mm rectangular.", ["0.5 mm sheet", "Flange only at the rectangular end"], ["Ø250 × 40 mm collar", "250 mm body"], ["Concentric axis"], ["No rectangular flange at the round inlet."]],
  "elbow-3": ["The shaft-entry elbow changes the horizontal route to vertical.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "200 mm throat radius; 350 mm outer radius"], ["90° bend"], ["Upper flange is 525 mm above the shaft base."]],
  "straight-4a": ["First vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +525; top +1,725 mm"], ["Vertical"], ["Support it from the shaft structure."]],
  "straight-4b": ["Second vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +1,725; top +2,925 mm"], ["Vertical"], ["Bolt and seal the flange joint."]],
  "straight-4c": ["Third vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +2,925; top +4,125 mm"], ["Vertical"], ["Bolt and seal the flange joint."]],
  "straight-4d": ["Final vertical riser section before the outlet elbow.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 615 mm", "Bottom +4,125; top +4,740 mm"], ["Vertical"], ["The adjusted length keeps the upper flange clear of the glass."]],
  "elbow-4": ["The upper elbow directs airflow outward through the GRC enclosure.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "200 mm throat radius; 350 mm outer radius", "410 × 210 mm outlet flange"], ["90° bend"], ["Visible GRC opening is 410 × 190 mm."]],
  "rain-hood": ["A hollow tapered outlet that limits rain entry.", ["0.5 mm sheet", "30 mm flange at the inlet only"], ["350 × 150 mm", "Bottom depth 200; top depth 300 mm", "Box bottom +4,940 mm"], ["Sloping outlet face"], ["No flange at the open end.", "Weather-seal the GRC junction."]],
  "building-context": ["Building geometry used to verify system clearances; it is not part of duct fabrication.", ["Walls and shaft", "GRC", "Glass", "Ceiling and roof slab"], ["840 × 380 mm clear shaft opening", "190 mm GRC height", "940 × 580 × 10 mm glass"], ["All building planes follow project datums"], ["Verify dimensions on site before cutting.", "Do not cut structural work without engineer approval."]]
};

for (const [key, [description, materials, measurements, angles, instructions]] of Object.entries(ductPartsEn)) {
  infoContent.en[key] = { description, materials, measurements, angles, instructions };
}
