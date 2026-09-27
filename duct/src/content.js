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
        { id: "ceiling-route", children: ["straight-1", "elbow-1", "elbow-2", "straight-2", "elbow-3", "straight-3"] },
        { id: "fan-chain", children: ["transition-1", "fan", "transition-2"] },
        { id: "shaft-rise", children: ["elbow-4", "straight-4a", "straight-4b", "straight-4c", "straight-4d"] },
        { id: "outlet", children: ["elbow-5", "rain-hood"] }
      ]
    },
    {
      id: "building-context",
      children: [
        "room-structure",
        { id: "ceiling-assembly", children: ["ceiling-roof", "downlight"] },
        "shaft-structure", "grc-enclosure", "glass-roof"
      ]
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

export const onboardingCopy = {
  id: {
    guide: "Panduan",
    step: "Langkah",
    of: "dari",
    back: "Kembali",
    next: "Lanjut",
    finish: "Mulai memeriksa",
    skip: "Lewati panduan",
    openLabel: "Buka panduan penggunaan",
    steps: [
      {
        title: "Selamat datang di viewer Opsi D",
        description: "Panduan singkat ini menunjukkan cara memeriksa seluruh sistem exhaust, dari hood sampai tudung hujan.",
        tip: "Panduan hanya muncul otomatis pada kunjungan pertama. Buka kembali kapan saja melalui tombol Panduan."
      },
      {
        target: ".language-switch",
        title: "Pilih bahasa",
        description: "Gunakan ID atau EN untuk mengganti seluruh nama komponen, tombol, serta informasi teknis.",
        tip: "Bahasa awal adalah Bahasa Indonesia."
      },
      {
        target: ".left-sidebar section:first-of-type",
        title: "Atur tampilan model",
        description: "Aktifkan warna komponen, dimensi dan sudut, atau titik notasi secara terpisah. Tampilkan semua dan Sembunyikan semua mengubah seluruh assembly.",
        tip: "Lampu LED tetap kuning agar mudah dikenali pada kedua mode warna."
      },
      {
        target: ".parts-section",
        title: "Periksa pohon komponen",
        description: "Buka atau tutup cabang dengan tanda +/−. Ikon mata menyembunyikan atau menampilkan bagian. Ikon target ◎ mengisolasi bagian, memberi warna kuning, dan mengarahkan kamera kepadanya.",
        tip: "Klik target yang sama lagi untuk memulihkan assembly sebelumnya."
      },
      {
        target: ".plate-stage",
        title: "Navigasikan model 3D",
        description: "Tarik untuk memutar. Klik kanan lalu tarik untuk menggeser. Gunakan roda gulir atau cubit untuk memperbesar dan memperkecil.",
        tip: "Anda dapat melanjutkan memutar model setelah menggunakan fokus ◎."
      },
      {
        target: ".info-sidebar",
        title: "Baca informasi fabrikasi",
        description: "Panel kanan mengikuti komponen atau induk yang sedang aktif dan menampilkan deskripsi, material, ukuran, sudut, serta petunjuk pemasangan.",
        tip: "Isolasi satu komponen untuk membuka data paling spesifik."
      },
      {
        target: ".navigation-footer",
        title: "Referensi navigasi selalu tersedia",
        description: "Ringkasan kontrol mouse dan trackpad tetap terlihat di bagian bawah viewer.",
        tip: "Sekarang Anda siap memeriksa sistem Opsi D."
      }
    ]
  },
  en: {
    guide: "Guide",
    step: "Step",
    of: "of",
    back: "Back",
    next: "Next",
    finish: "Start inspecting",
    skip: "Skip guide",
    openLabel: "Open usage guide",
    steps: [
      {
        title: "Welcome to the Option D viewer",
        description: "This short guide shows you how to inspect the complete exhaust system, from the hood to the rain hood.",
        tip: "The guide opens automatically only on your first visit. Reopen it at any time with the Guide button."
      },
      {
        target: ".language-switch",
        title: "Choose a language",
        description: "Use ID or EN to switch all component names, controls, and technical information.",
        tip: "The default language is Indonesian."
      },
      {
        target: ".left-sidebar section:first-of-type",
        title: "Control the model display",
        description: "Toggle component colours, dimensions and angles, or point notations independently. Show all and Hide all affect the complete assembly.",
        tip: "The LED lights remain yellow in both colour modes for easy identification."
      },
      {
        target: ".parts-section",
        title: "Inspect the component tree",
        description: "Expand or collapse branches with +/−. The eye hides or shows a part. The ◎ target isolates it, highlights it yellow, and moves the camera to it.",
        tip: "Select the same target again to restore the previous assembly."
      },
      {
        target: ".plate-stage",
        title: "Navigate the 3D model",
        description: "Drag to rotate. Right-click and drag to pan. Use the wheel or pinch gesture to zoom.",
        tip: "You can continue rotating after using ◎ focus."
      },
      {
        target: ".info-sidebar",
        title: "Read fabrication information",
        description: "The right panel follows the active part or parent and shows its description, materials, measurements, angles, and installation instructions.",
        tip: "Isolate one component to view its most specific data."
      },
      {
        target: ".navigation-footer",
        title: "Navigation help stays available",
        description: "A compact mouse and trackpad reference remains visible below the viewer.",
        tip: "You are ready to inspect the Option D system."
      }
    ]
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
    ,"elbow-5": "Siku 5"
    ,"rain-hood": "Tudung hujan"
    ,"building-context": "Konteks bangunan"
    ,"room-structure": "Dinding dan lantai"
    ,"ceiling-assembly": "Plafon"
    ,"ceiling-roof": "Plafon dan pelat atap"
    ,downlight: "Downlight plafon"
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
    "elbow-5": "Elbow 5",
    "rain-hood": "Rain hood",
    "building-context": "Building context",
    "room-structure": "Walls and floor",
    "ceiling-assembly": "Ceiling",
    "ceiling-roof": "Ceiling and roof slab",
    downlight: "Ceiling downlight",
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
  "ceiling-roof": "ceiling-assembly",
  downlight: "downlight",
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
  "complete-system": ["Rangkaian lengkap Opsi D dari hood sampai tudung hujan, ditampilkan bersama konteks bangunan.", ["Hood stainless steel 1 mm", "Duct persegi panjang dan transisi pelat 0,5 mm", "Flange integral 30 mm", "Kipas CKE CI-CDI250AZ-NO"], ["Hood 1.500 × 600 mm", "Duct utama 350 × 150 mm", "Shaft bersih 840 × 380 mm", "Bawah kotak tudung hujan +4.940 mm dari dasar shaft"], ["Lima siku 90°", "Kemiringan hood 21,8°"], ["Survei semua datum bangunan sebelum fabrikasi.", "Jaga akses ke kipas dan semua sambungan sampai pengujian selesai."]],
  "duct-system": ["Rangkaian duct dari curb hood menuju outlet luar melalui plafon dan shaft.", ["Pelat galvanis/stainless 0,5 mm", "Flange integral 30 mm pada sambungan persegi"], ["Penampang nominal 350 × 150 mm", "Leher bulat Ø250 mm pada kipas"], ["Lima siku 90°"], ["Segel semua flange dan sambungan.", "Sangga duct secara mandiri; jangan membebani hood atau kipas."]],
  "ceiling-route": ["Rute plafon memakai tiga siku untuk mempertahankan penampang 350 × 150 mm dalam orientasi mendatar.", ["Duct mendatar 350 × 150 mm", "Flange integral 30 mm"], ["Lurus 1: 715 mm", "Lurus 2: 245 mm", "Lurus 3: 475 mm"], ["Siku 1, 2, dan 3: 90°"], ["Verifikasi clearance plafon, lampu, dan dinding sebelum dipasang."]],
  "fan-chain": ["Dua transisi menghubungkan duct persegi dengan kipas inline Ø250 mm.", ["Transisi pelat 0,5 mm", "Kipas CKE CI-CDI250AZ-NO"], ["Badan transisi masing-masing 250 mm", "Leher silinder 40 mm", "Kipas total 205 mm"], ["Semua pusat sambungan segaris"], ["Kipas adalah barang jadi; jangan difabrikasi.", "Sediakan akses servis dan dudukan mandiri."]],
  "shaft-rise": ["Siku masuk shaft dan empat bagian duct tegak berflange.", ["Duct 350 × 150 mm", "Flange integral 30 mm"], ["Bagian 1: 1.200 mm", "Bagian 2: 1.200 mm", "Bagian 3: 1.200 mm", "Bagian 4: 615 mm"], ["Siku masuk shaft 90°"], ["Pasang penyangga pada struktur shaft.", "Baut dan segel setiap sambungan flange."]],
  outlet: ["Siku atas mengarahkan aliran ke tudung hujan melalui GRC.", ["Duct 350 × 150 mm", "Tudung hujan berongga"], ["Tudung: 350 lebar × 150 tinggi", "Kedalaman bawah 200; atas 300 mm", "Bawah kotak +4.940 mm dari dasar shaft"], ["Siku 5: 90°", "Muka tudung meruncing"], ["Ujung keluar tanpa flange.", "Pasang kisi hujan yang tidak terlalu rapat."]],
  "straight-1": ["Duct tegak dari curb hood menuju Siku 1.", ["Pelat 0,5 mm", "Dua flange integral 30 mm"], ["350 × 150 mm", "Tinggi 715 mm", "Flange luar 410 × 210 mm"], ["Tegak lurus terhadap hood"], ["Flange adalah bagian dari Lurus 1.", "Cocokkan lubang hood sebelum pemasangan."]],
  "elbow-1": ["Siku pertama membelokkan aliran vertikal menjadi lintasan mendatar dan meratakan penampang duct.", ["Pelat 0,5 mm", "Flange 30 mm di kedua ujung"], ["Penampang 350 × 150 mm", "Radius garis tengah 275 mm"], ["Belokan 90°"], ["Gunakan pelat lengkung menerus."]],
  "elbow-2": ["Siku kedua membelokkan lintasan mendatar menuju Lurus 2.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 350 × 150 mm", "Radius garis tengah 275 mm"], ["Belokan 90°"], ["Pertahankan orientasi duct mendatar."]],
  "straight-2": ["Duct pendek mendatar yang mengisi jarak antara Siku 2 dan Siku 3.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 350 × 150 mm", "Panjang bersih 245 mm"], ["Mendatar"], ["Ukur 245 mm bersih antar muka sambungan."]],
  "elbow-3": ["Siku ketiga mengembalikan arah lintasan menuju Lurus 3 dan kipas.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 350 × 150 mm", "Radius garis tengah 275 mm"], ["Belokan 90°"], ["Pastikan muka keluar segaris dengan Lurus 3."]],
  "straight-3": ["Duct mendatar menuju Transisi 1 setelah penambahan Siku 3.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 mm", "Kedalaman 475 mm"], ["Mendatar"], ["Jaga flange bebas dari dinding shaft."]],
  "transition-1": ["Transisi dari 350 × 150 mm menjadi Ø250 mm sebelum kipas.", ["Pelat 0,5 mm", "Flange hanya pada sisi persegi"], ["Badan 250 mm", "Leher Ø250 × 40 mm"], ["Sumbu lurus"], ["Ujung bulat tidak memakai flange persegi."]],
  fan: ["Kipas sentrifugal duct inline yang sudah dibeli.", ["CKE CI-CDI250AZ-NO", "Collar Ø250 mm"], ["Lebar keseluruhan 380 mm", "Muka 349; badan 335 mm", "Panjang total 205 mm", "Collar 25 mm tiap sisi"], ["Sumbu horizontal"], ["Jangan dibuat oleh fabrikator duct.", "Terminal listrik di kanan; dudukan berada di atas."]],
  "transition-2": ["Transisi setelah kipas dari Ø250 mm ke 350 × 150 mm.", ["Pelat 0,5 mm", "Flange hanya pada sisi persegi"], ["Leher Ø250 × 40 mm", "Badan 250 mm"], ["Sumbu lurus"], ["Ujung bulat awal tanpa flange persegi."]],
  "elbow-4": ["Siku masuk shaft mengubah duct mendatar menjadi tegak.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 mm", "Radius dalam 200; luar 350 mm"], ["Belokan 90°"], ["Flange atas berada 525 mm di atas dasar shaft."]],
  "straight-4a": ["Bagian pertama duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +525; atas +1.725 mm"], ["Vertikal"], ["Pasang penyangga pada struktur shaft."]],
  "straight-4b": ["Bagian kedua duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +1.725; atas +2.925 mm"], ["Vertikal"], ["Baut dan segel sambungan flange."]],
  "straight-4c": ["Bagian ketiga duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +2.925; atas +4.125 mm"], ["Vertikal"], ["Baut dan segel sambungan flange."]],
  "straight-4d": ["Bagian terakhir duct tegak sebelum siku outlet.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 615 mm", "Bawah +4.125; atas +4.740 mm"], ["Vertikal"], ["Panjang menjaga flange atas tidak menyentuh kaca."]],
  "elbow-5": ["Siku atas mengarahkan aliran keluar melalui GRC.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 mm", "Radius dalam 200; luar 350 mm", "Flange keluar 410 × 210 mm"], ["Belokan 90°"], ["Bukaan GRC terlihat 410 × 190 mm."]],
  "rain-hood": ["Outlet berongga dan meruncing untuk mengurangi masuknya hujan.", ["Pelat 0,5 mm", "Flange 30 mm hanya pada inlet"], ["350 × 150 mm", "Kedalaman bawah 200; atas 300 mm", "Bawah kotak +4.940 mm"], ["Muka keluar miring"], ["Tanpa flange pada ujung keluar.", "Segel pertemuan dengan GRC."]],
  "building-context": ["Konteks bangunan dipakai untuk memeriksa clearance sistem, bukan bagian fabrikasi duct.", ["Dinding/shaft", "GRC", "Kaca", "Plafon, pelat atap, dan satu downlight"], ["Bukaan shaft bersih 840 × 380 mm", "GRC tinggi 190 mm", "Kaca 940 × 580 × 10 mm"], ["Semua bidang bangunan mengikuti datum proyek"], ["Verifikasi lapangan sebelum pemotongan.", "Jangan memotong struktur tanpa persetujuan engineer."]],
  "ceiling-assembly": ["Plafon dan pelat atap dengan satu downlight yang ditempatkan bebas dari dinding shaft dan rute duct.", ["Bidang plafon", "Pelat atap", "Satu downlight recessed"], ["Elevasi plafon +930 mm pada model", "Trim Ø165 mm", "Cutout Ø139 mm"], ["Downlight tegak lurus terhadap plafon"], ["Jangan menempatkan hanger duct pada bukaan downlight.", "Pertahankan akses ke driver lampu."]],
  downlight: ["Downlight tunggal dipindahkan 150 mm ke depan dari posisi survei awal untuk mempertahankan clearance terhadap duct dan diletakkan sepenuhnya di luar footprint dinding shaft.", ["Trim dan body lampu recessed", "Bukaan plafon Ø139 mm"], ["Trim Ø165 mm", "Cutout Ø139 mm", "Pusat 932,5 mm dari dinding kiri", "Pusat 1.062,5 mm maju dari dinding belakang", "Clearance plan ke duct sekitar 207 mm", "Clearance vertikal ke flange duct sekitar 120 mm", "Clearance tepi trim ke dinding shaft terdekat sekitar 1.065 mm"], ["Sumbu lampu tegak lurus plafon"], ["Jaga hanger dan driver di luar envelope duct.", "Verifikasi posisi terhadap rangka plafon sebelum melubangi."]]
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
  "complete-system": ["Complete Option D route from the hood to the rain hood, shown with its building context.", ["1 mm stainless-steel hood", "0.5 mm rectangular duct and transitions", "30 mm integral flanges", "CKE CI-CDI250AZ-NO fan"], ["1,500 × 600 mm hood", "350 × 150 mm main duct", "840 × 380 mm clear shaft", "Rain-hood box bottom +4,940 mm from shaft base"], ["Five 90° elbows", "Hood slope 21.8°"], ["Survey every building datum before fabrication.", "Keep the fan and every joint accessible until testing is complete."]],
  "duct-system": ["The complete duct route from the hood curb to the outdoor outlet through the ceiling and shaft.", ["0.5 mm galvanized/stainless sheet", "30 mm integral flanges at rectangular joints"], ["350 × 150 mm nominal rectangular section", "Ø250 mm fan collars"], ["Five 90° elbows"], ["Seal every flange and joint.", "Support the duct independently from the hood and fan."]],
  "ceiling-route": ["The ceiling route uses three elbows to keep the 350 × 150 mm section in its flat orientation.", ["Flat 350 × 150 mm duct", "30 mm integral flanges"], ["Straight 1: 715 mm", "Straight 2: 245 mm", "Straight 3: 475 mm"], ["Elbows 1, 2, and 3: 90°"], ["Verify ceiling, light, and wall clearances before installation."]],
  "fan-chain": ["Two transitions connect the rectangular duct to the Ø250 mm inline fan.", ["0.5 mm transition sheet", "CKE CI-CDI250AZ-NO fan"], ["Each transition body: 250 mm", "Cylindrical collar: 40 mm", "Fan overall depth: 205 mm"], ["All connection axes are aligned"], ["The fan is purchased equipment; do not fabricate it.", "Provide independent support and service access."]],
  "shaft-rise": ["The shaft-entry elbow and four flanged vertical duct sections.", ["350 × 150 mm duct", "30 mm integral flanges"], ["Section 1: 1,200 mm", "Section 2: 1,200 mm", "Section 3: 1,200 mm", "Section 4: 615 mm"], ["Shaft-entry elbow: 90°"], ["Support the riser from the shaft structure.", "Bolt and seal every flange joint."]],
  outlet: ["The upper elbow discharges through the GRC enclosure into the rain hood.", ["350 × 150 mm duct", "Hollow tapered rain hood"], ["Rain hood: 350 × 150 mm", "Bottom depth 200; top depth 300 mm", "Box bottom +4,940 mm from shaft base"], ["Elbow 5: 90°", "Tapered outlet face"], ["No flange at the open outlet.", "Fit a free-flowing rain grille."]],
  "straight-1": ["Vertical duct from the hood curb to Elbow 1.", ["0.5 mm sheet", "Two 30 mm integral flanges with 12 holes each"], ["350 × 150 mm", "715 mm high", "410 × 210 mm flange envelope"], ["Normal to the hood top"], ["The flanges belong to Straight 1.", "Match the hood opening before installation."]],
  "elbow-1": ["The first elbow turns the vertical flow into a horizontal route and rolls the duct to its flat orientation.", ["0.5 mm sheet", "30 mm flanges with fastener holes"], ["350 × 150 mm", "275 mm centreline radius"], ["90° bend"], ["Form the curved sheets continuously."]],
  "elbow-2": ["The second elbow turns the flat horizontal route toward Straight 2.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "275 mm centreline radius"], ["90° bend"], ["Maintain the flat duct orientation."]],
  "straight-2": ["Short flat duct filling the space between Elbows 2 and 3.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm section", "245 mm clear length"], ["Horizontal"], ["Measure 245 mm clear between the connection faces."]],
  "elbow-3": ["The third elbow returns the route toward Straight 3 and the fan.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "275 mm centreline radius"], ["90° bend"], ["Align its outlet face with Straight 3."]],
  "straight-3": ["Flat horizontal duct leading to Transition 1 after the added third elbow.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "475 mm depth"], ["Horizontal"], ["Keep the flange clear of the shaft wall."]],
  "transition-1": ["Transition from 350 × 150 mm rectangular to Ø250 mm round before the fan.", ["0.5 mm sheet", "Flange only at the rectangular end"], ["250 mm body", "Ø250 × 40 mm collar"], ["Concentric axis"], ["Do not add a rectangular flange to the round end."]],
  fan: ["Purchased centrifugal inline duct fan.", ["CKE CI-CDI250AZ-NO", "Ø250 mm collars"], ["380 mm overall width", "349 mm face; 335 mm body", "205 mm total depth", "25 mm collar at each end"], ["Horizontal axis"], ["Do not fabricate the fan.", "Electrical terminal is on the right; support foot is above."]],
  "transition-2": ["Transition after the fan from Ø250 mm round to 350 × 150 mm rectangular.", ["0.5 mm sheet", "Flange only at the rectangular end"], ["Ø250 × 40 mm collar", "250 mm body"], ["Concentric axis"], ["No rectangular flange at the round inlet."]],
  "elbow-4": ["The shaft-entry elbow changes the horizontal route to vertical.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "200 mm throat radius; 350 mm outer radius"], ["90° bend"], ["Upper flange is 525 mm above the shaft base."]],
  "straight-4a": ["First vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +525; top +1,725 mm"], ["Vertical"], ["Support it from the shaft structure."]],
  "straight-4b": ["Second vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +1,725; top +2,925 mm"], ["Vertical"], ["Bolt and seal the flange joint."]],
  "straight-4c": ["Third vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +2,925; top +4,125 mm"], ["Vertical"], ["Bolt and seal the flange joint."]],
  "straight-4d": ["Final vertical riser section before the outlet elbow.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 615 mm", "Bottom +4,125; top +4,740 mm"], ["Vertical"], ["The adjusted length keeps the upper flange clear of the glass."]],
  "elbow-5": ["The upper elbow directs airflow outward through the GRC enclosure.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "200 mm throat radius; 350 mm outer radius", "410 × 210 mm outlet flange"], ["90° bend"], ["Visible GRC opening is 410 × 190 mm."]],
  "rain-hood": ["A hollow tapered outlet that limits rain entry.", ["0.5 mm sheet", "30 mm flange at the inlet only"], ["350 × 150 mm", "Bottom depth 200; top depth 300 mm", "Box bottom +4,940 mm"], ["Sloping outlet face"], ["No flange at the open end.", "Weather-seal the GRC junction."]],
  "building-context": ["Building geometry used to verify system clearances; it is not part of duct fabrication.", ["Walls and shaft", "GRC", "Glass", "Ceiling, roof slab, and one downlight"], ["840 × 380 mm clear shaft opening", "190 mm GRC height", "940 × 580 × 10 mm glass"], ["All building planes follow project datums"], ["Verify dimensions on site before cutting.", "Do not cut structural work without engineer approval."]],
  "ceiling-assembly": ["Ceiling and roof slab with one downlight positioned clear of the shaft walls and duct route.", ["Ceiling plane", "Roof slab", "One recessed downlight"], ["Ceiling elevation +930 mm in the model", "Ø165 mm trim", "Ø139 mm cut-out"], ["Downlight is normal to the ceiling"], ["Keep duct hangers clear of the opening.", "Preserve access to the lamp driver."]],
  downlight: ["The single downlight is moved 150 mm forward from its original surveyed position for duct clearance and sits completely outside the shaft-wall footprint.", ["Recessed lamp trim and body", "Ø139 mm ceiling cut-out"], ["Ø165 mm trim", "Ø139 mm cut-out", "Centre 932.5 mm from the left wall", "Centre 1,062.5 mm forward from the back wall", "Approx. 207 mm plan clearance to duct", "Approx. 120 mm vertical clearance to duct flange", "Approx. 1,065 mm trim-edge clearance to the nearest shaft wall"], ["Lamp axis is normal to the ceiling"], ["Keep hangers and the driver outside the duct envelope.", "Verify the ceiling frame before cutting."]]
};

for (const [key, [description, materials, measurements, angles, instructions]] of Object.entries(ductPartsEn)) {
  infoContent.en[key] = { description, materials, measurements, angles, instructions };
}
