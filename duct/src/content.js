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
        { id: "ceiling-route", children: ["straight-1", "elbow-1", "elbow-2", "straight-2", "elbow-3"] },
        { id: "fan-chain", children: ["transition-1", "fan", "transition-2", "straight-3", "entry-elbow-1", "entry-drop", "entry-elbow-2"] },
        { id: "shaft-rise", children: ["elbow-4", "straight-4a", "straight-4b", "straight-4c", "straight-4d"] },
        { id: "outlet", children: ["elbow-5", "rain-hood"] }
      ]
    },
    {
      id: "building-context",
      children: [
        "room-structure",
        { id: "ceiling-assembly", children: ["ceiling-roof", "downlight"] },
        "shaft-structure",
        { id: "shaft-openings", children: ["shaft-side-access"] },
        { id: "shaft-top-assembly", children: ["shaft-top-walls", "shaft-front-mesh", "glass-roof"] }
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
    ,"entry-elbow-1": "Siku masuk 1 — turun"
    ,"entry-drop": "Lurus pendek vertikal"
    ,"entry-elbow-2": "Siku masuk 2 — menuju shaft"
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
    ,"shaft-openings": "Bukaan instalasi shaft"
    ,"shaft-side-access": "Bukaan besar ruang laundry"
    ,"shaft-top-assembly": "Struktur atas shaft"
    ,"shaft-top-walls": "Dinding atas tertutup"
    ,"shaft-front-mesh": "Mesh dan rangka depan"
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
    "entry-elbow-1": "Entry elbow 1 — downward",
    "entry-drop": "Short vertical straight",
    "entry-elbow-2": "Entry elbow 2 — toward shaft",
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
    "shaft-openings": "Shaft installation openings",
    "shaft-side-access": "Laundry-room side opening",
    "shaft-top-assembly": "Shaft-top construction",
    "shaft-top-walls": "Enclosed upper walls",
    "shaft-front-mesh": "Front mesh and frame",
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
  "room-structure": "room-structure",
  "ceiling-roof": "ceiling-assembly",
  downlight: "downlight",
  "shaft-structure": "shaft-structure",
  "shaft-side-access": "shaft-side-access",
  "shaft-top-walls": "shaft-top-assembly",
  "shaft-front-mesh": "shaft-top-assembly",
  "glass-roof": "shaft-top-assembly"
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
  "complete-system": ["Rangkaian lengkap Opsi D dari hood sampai tudung hujan. Sepasang siku dan lurus vertikal pendek membentuk offset-U di bawah dinding/ring beam tanpa penetrasi struktur.", ["Hood stainless steel 1 mm", "Duct persegi panjang dan transisi pelat 0,5 mm", "Flange integral 30 mm", "Kipas CKE CI-CDI250AZ-NO", "Dinding shaft bata dan atap struktur"], ["Hood 1.500 × 600 mm", "Duct utama 350 × 150 mm", "Shaft bersih 840 × 380 mm", "Dinding shaft 4.930 mm", "Kotak tudung hujan +4.980 sampai +5.130 mm"], ["Tujuh siku 90°", "Lurus 3 naik 20,7°", "Kemiringan hood 21,8°"], ["Survei semua datum bangunan sebelum fabrikasi.", "Pertahankan kolom praktis, ring beam, beton dan tulangan tanpa potongan.", "Pasang Siku 5 sebelum mesh dan atap kaca ditutup."]],
  "duct-system": ["Rangkaian duct dari curb hood menuju outlet luar melalui plafon dan shaft.", ["Pelat galvanis/stainless 0,5 mm", "Flange integral 30 mm pada sambungan persegi"], ["Penampang nominal 350 × 150 mm", "Leher bulat Ø250 mm pada kipas"], ["Tujuh siku 90°"], ["Segel semua flange dan sambungan.", "Sangga duct secara mandiri; jangan membebani hood atau kipas."]],
  "ceiling-route": ["Rute plafon memakai tiga siku untuk mempertahankan penampang 350 × 150 mm dalam orientasi mendatar dan menggeser rute shaft 10 mm dari dinding kiri.", ["Duct mendatar 350 × 150 mm", "Flange integral 30 mm"], ["Lurus 1: 715 mm", "Lurus 2: 235 mm", "Clearance bawah/atas flange terhadap plafon dan slab: sekitar 135/135 mm"], ["Siku 1, 2, dan 3: 90°"], ["Pertahankan elevasi saat ini.", "Verifikasi downlight, hanger, dan struktur atap sebelum pemasangan."]],
  "fan-chain": ["Setelah Transisi 2, Lurus 3 naik sedikit menuju siku turun, lurus vertikal pendek, dan siku kedua menuju Siku 4. Pasangan siku membentuk offset-U di bawah dinding shaft.", ["Transisi dan duct pelat 0,5 mm", "Kipas CKE CI-CDI250AZ-NO", "Flange integral 30 mm"], ["Badan transisi masing-masing 250 mm", "Leher silinder 40 mm", "Kipas total 205 mm", "Lurus 3: plan 225 mm; naik 85 mm", "Lurus vertikal pendek: 100 mm", "Clearance flange penuh ke bawah shaft: 10 mm"], ["Sumbu fan horizontal", "Lurus 3 naik 20,7°", "Dua siku masuk: masing-masing 90°"], ["Kipas adalah barang jadi; jangan difabrikasi.", "Sangga offset-U secara mandiri.", "Pastikan flange pasangan siku kedua–Siku 4 terpasang dan tersegel."]],
  "shaft-rise": ["Siku 4 di sudut bawah shaft tersambung langsung ke empat bagian riser. Tiga bagian pertama tetap maksimum 1.200 mm; bagian terakhir diperpanjang agar outlet atas tetap pada elevasi lama.", ["Duct 350 × 150 mm", "Flange integral 30 mm", "Hoist dan penyangga sementara tersertifikasi"], ["Bagian 1: 1.200 mm (+60 sampai +1.260)", "Bagian 2: 1.200 mm (+1.260 sampai +2.460)", "Bagian 3: 1.200 mm (+2.460 sampai +3.660)", "Bagian 4: 1.120 mm (+3.660 sampai +4.780)", "Gap flange ke dinding kiri: 10 mm"], ["Siku masuk shaft 90°"], ["Pasang dua bagian bawah dari dasar shaft.", "Rakit bagian atas dengan metode stack-and-lift melalui bukaan laundry.", "Baut, segel, dan sangga setiap sambungan."]],
  outlet: ["Siku atas mengarahkan aliran melalui mesh depan menuju tudung hujan dan dipasang sebelum penutupan struktur atas shaft.", ["Duct 350 × 150 mm", "Tudung hujan berongga", "Sambungan slip internal tanpa flange luar"], ["Tudung: 350 lebar × 150 tinggi", "Kedalaman bawah 200; atas 300 mm", "Kotak +4.980 sampai +5.130 mm", "Clearance 20 mm di atas dan bawah bukaan 190 mm"], ["Siku 5: 90°", "Muka tudung meruncing"], ["Pasang Siku 5 sebelum mesh dan kaca ditutup.", "Gunakan overlap slip internal 40–50 mm dan segel menerus.", "Tidak ada flange luar pada sambungan Siku 5–tudung hujan."]],
  "straight-1": ["Duct tegak dari curb hood menuju Siku 1.", ["Pelat 0,5 mm", "Dua flange integral 30 mm"], ["350 × 150 mm", "Tinggi 715 mm", "Flange luar 410 × 210 mm"], ["Tegak lurus terhadap hood"], ["Flange adalah bagian dari Lurus 1.", "Cocokkan lubang hood sebelum pemasangan."]],
  "elbow-1": ["Siku pertama memakai geometri square-throat, radius-heel seperti Siku 4 untuk membelokkan aliran vertikal menjadi lintasan mendatar.", ["Pelat 0,5 mm", "Flange 30 mm di kedua ujung", "Sambungan kedap grease"], ["Penampang minimum 350 × 150 mm", "Span tampak samping 350 × 350 mm", "Radius throat dalam 0 mm", "Radius heel luar 150 mm", "Leher lurus 200 mm sebelum dan sesudah lengkung"], ["Belokan 90°", "Sudut throat dalam 90°", "Heel luar seperempat lingkaran 90°"], ["Pertahankan muka inlet dan outlet lama agar Lurus 1 dan Siku 2 tetap tersambung."]],
  "elbow-2": ["Siku kedua membelokkan lintasan mendatar menuju Lurus 2.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 350 × 150 mm", "Radius garis tengah 275 mm"], ["Belokan 90°"], ["Pertahankan orientasi duct mendatar."]],
  "straight-2": ["Duct pendek mendatar yang mengisi jarak antara Siku 2 dan Siku 3 setelah rute shaft digeser 10 mm ke kanan.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 350 × 150 mm", "Panjang bersih 235 mm"], ["Mendatar"], ["Ukur 235 mm bersih antar muka sambungan."]],
  "elbow-3": ["Siku ketiga mengembalikan arah lintasan menuju Lurus 3 dan kipas.", ["Pelat 0,5 mm", "Flange 30 mm"], ["Penampang 350 × 150 mm", "Radius garis tengah 275 mm"], ["Belokan 90°"], ["Pastikan muka keluar segaris dengan Lurus 3."]],
  "straight-3": ["Duct offset miring pendek setelah Transisi 2 yang naik menuju siku pertama offset-U tanpa mengubah bukaan ujung 350 × 150 mm.", ["Pelat 0,5 mm", "Flange 30 mm pada kedua ujung"], ["350 × 150 mm pada kedua ujung", "Panjang plan 225 mm", "Naik 85 mm"], ["Kemiringan naik 20,7°", "Muka ujung vertikal"], ["Fabrikasi sebagai offset bersisi miring dan kedap grease.", "Sangga agar tidak membebani kipas."]],
  "entry-elbow-1": ["Siku square-throat/radius-heel pertama mengubah aliran mendatar menjadi vertikal turun.", ["Pelat 0,5 mm", "Flange 30 mm di kedua ujung"], ["Penampang minimum 350 × 150 mm", "Span 250 × 250 mm", "Radius heel luar 150 mm", "Leher lurus 100 mm"], ["Belokan 90°", "Throat dalam siku 90°"], ["Hubungkan langsung ke Lurus 3 dan lurus vertikal pendek."]],
  "entry-drop": ["Lurus vertikal pendek di antara dua siku offset-U.", ["Pelat 0,5 mm", "Flange 30 mm pada kedua ujung"], ["350 × 150 × 100 mm"], ["Vertikal"], ["Baut dan segel kedua pasang flange."]],
  "entry-elbow-2": ["Siku square-throat/radius-heel kedua mengubah aliran turun menjadi mendatar menuju Siku 4.", ["Pelat 0,5 mm", "Flange 30 mm di kedua ujung"], ["Penampang minimum 350 × 150 mm", "Span 250 × 250 mm", "Radius heel luar 150 mm", "Leher lurus 100 mm", "Clearance flange ke bawah shaft 10 mm"], ["Belokan 90°", "Throat dalam siku 90°"], ["Pertahankan flange pasangan 30 mm antara outlet siku ini dan inlet Siku 4.", "Segel sambungan menerus."]],
  "transition-1": ["Transisi dari 350 × 150 mm menjadi Ø250 mm sebelum kipas.", ["Pelat 0,5 mm", "Flange hanya pada sisi persegi"], ["Badan 250 mm", "Leher Ø250 × 40 mm"], ["Sumbu lurus"], ["Ujung bulat tidak memakai flange persegi."]],
  fan: ["Kipas sentrifugal duct inline yang sudah dibeli.", ["CKE CI-CDI250AZ-NO", "Collar Ø250 mm"], ["Lebar keseluruhan 380 mm", "Muka 349; badan 335 mm", "Panjang total 205 mm", "Collar 25 mm tiap sisi"], ["Sumbu horizontal"], ["Jangan dibuat oleh fabrikator duct.", "Terminal listrik di kanan; dudukan berada di atas."]],
  "transition-2": ["Transisi setelah kipas dari Ø250 mm ke 350 × 150 mm.", ["Pelat 0,5 mm", "Flange hanya pada sisi persegi"], ["Leher Ø250 × 40 mm", "Badan 250 mm"], ["Sumbu lurus"], ["Ujung bulat awal tanpa flange persegi."]],
  "elbow-4": ["Siku kompak square-throat, radius-heel ditempatkan di sudut bawah shaft dan mengubah jalur mendatar menjadi riser tegak. Luas aliran minimum tetap 350 × 150 mm.", ["Pelat 0,5 mm", "Flange 30 mm di inlet dan outlet", "Sambungan fabrikasi kedap grease"], ["Span badan tampak samping 250 × 250 mm", "Radius throat dalam 0 mm", "Radius heel luar 150 mm", "Leher lurus 100 mm sebelum dan sesudah lengkung", "Outlet +60 mm dari dasar shaft", "Clearance flange inlet ke bawah shaft 10 mm", "Centerline 215 mm dari dinding kiri"], ["Belokan 90°", "Sudut throat dalam 90°", "Heel luar seperempat lingkaran 90°"], ["Rakit sebelum riser dinaikkan.", "Connector inlet dan Lurus 4A outlet harus bertemu tanpa gap.", "Jangan potong ring beam, kolom praktis, beton, atau tulangan."]],
  "straight-4a": ["Bagian pertama duct tegak dimulai langsung dari outlet Siku 4.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +60; atas +1.260 mm"], ["Vertikal"], ["Pasang dan sangga dari dasar shaft."]],
  "straight-4b": ["Bagian kedua duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +1.260; atas +2.460 mm"], ["Vertikal"], ["Baut dan segel sambungan flange."]],
  "straight-4c": ["Bagian ketiga duct tegak di dalam shaft.", ["Pelat 0,5 mm", "Flange 30 mm"], ["350 × 150 × 1.200 mm", "Bawah +2.460; atas +3.660 mm"], ["Vertikal"], ["Baut dan segel sambungan flange."]],
  "straight-4d": ["Bagian terakhir duct tegak diperpanjang agar elevasi Siku 5 dan tudung hujan tetap tidak berubah.", ["Pelat 0,5 mm", "Flange 30 mm pada sambungan bawah"], ["350 × 150 × 1.120 mm", "Bawah +3.660; atas +4.780 mm"], ["Vertikal"], ["Pasang sebelum struktur atas ditutup.", "Pertahankan 20 mm clearance kotak outlet terhadap rangka atas dan bawah."]],
  "elbow-5": ["Siku atas memakai geometri square-throat, radius-heel seperti Siku 4 dan dipasang sebelum mesh/rangka depan serta kaca ditutup.", ["Pelat 0,5 mm", "Flange 30 mm hanya pada inlet bawah", "Outlet tanpa flange luar", "Sambungan kedap grease"], ["Penampang minimum 350 × 150 mm", "Span tampak samping 350 × 350 mm", "Radius throat dalam 0 mm", "Radius heel luar 150 mm", "Leher lurus 200 mm sebelum dan sesudah lengkung", "Inlet +4.780 mm", "Center outlet +5.055 mm"], ["Belokan 90°", "Sudut throat dalam 90°", "Heel luar seperempat lingkaran 90°"], ["Pertahankan muka inlet dan outlet lama.", "Gunakan sambungan slip internal ke tudung hujan."]],
  "rain-hood": ["Outlet berongga dan meruncing, ditempatkan simetris pada akses depan setinggi 190 mm.", ["Pelat 0,5 mm", "Sambungan slip internal tanpa flange luar"], ["350 × 150 mm", "Kedalaman bawah 200; atas 300 mm", "Bawah kotak +4.980 mm", "Atas kotak +5.130 mm"], ["Muka keluar miring"], ["Segel overlap internal secara menerus.", "Sisakan 20 mm terhadap rangka bawah dan atas."]],
  "building-context": ["Konteks bangunan menunjukkan ruang, plafon, slab struktur, shaft bata dengan satu bukaan kerja laundry, struktur mesh depan, dan atap kaca.", ["Dinding bata shaft", "Slab/atap struktur", "Rangka baja 30 mm", "Wire mesh depan", "Kaca"], ["Ruang bersih 1.800 × 3.000 × 2.680 mm", "Shaft bersih 840 × 380 mm", "Dinding shaft 4.930 mm", "Zona atas 250 mm", "Kaca 1.240 × 730 × 10 mm", "Overhang kaca 50 mm di depan dan kanan"], ["Semua bidang bangunan mengikuti datum proyek"], ["Verifikasi datum di lapangan.", "Jangan potong kolom praktis, ring beam, beton atau tulangan."]],
  "room-structure": ["Volume ruang dipakai sebagai datum posisi hood, plafon, downlight, dan jarak menuju shaft.", ["Dinding dan lantai bangunan"], ["Lebar bersih 1.800 mm", "Kedalaman bersih 3.000 mm", "Lantai ke bawah plafon 2.680 mm", "Void plafon 480 mm"], ["Dinding, lantai, dan plafon saling tegak lurus"], ["Konfirmasi ukuran jadi setelah plester/finishing.", "Gunakan muka dinding belakang jadi sebagai datum kedalaman duct."]],
  "shaft-structure": ["Shaft bata menampung riser dengan gap nominal 10 mm terhadap dinding kiri dan satu bukaan kerja laundry. Dinding belakang serta struktur bawah tetap utuh.", ["Dinding bata", "Kolom praktis/ring beam eksisting", "Rangka/lintel baja pada bukaan laundry", "Slab atap struktur"], ["Lebar bersih 840 mm", "Kedalaman bersih 380 mm", "Tinggi dinding 4.930 mm", "Gap flange kiri 10 mm"], ["Shaft vertikal"], ["Jangan potong kolom praktis, ring beam, slab atau tulangan.", "Periksa kelurusan dinding karena gap kiri hanya 10 mm."]],
  "shaft-openings": ["Hanya bukaan kerja besar eksisting pada dinding kanan dari ruang laundry yang dipakai. Tidak ada penetrasi baru untuk Siku 4 karena duct mengitari bawah dinding shaft.", ["Rangka perimeter bukaan laundry", "Dinding bata shaft"], ["Akses laundry: 380 × 1.700 mm; sill +1.500 mm"], ["Bukaan tegak lurus dinding kanan"], ["Pertahankan dinding belakang, kolom praktis, dan ring beam utuh.", "Jangan memotong beton atau tulangan."]],
  "shaft-side-access": ["Bukaan kerja besar pada dinding kanan dapat dipakai pekerja dari lantai laundry dan menjadi zona sambungan stack-and-lift.", ["Rangka perimeter baja", "Dinding bata"], ["Lebar mengikuti kedalaman bersih shaft: 380 mm", "Tinggi 1.700 mm", "Sill +1.500 mm", "Top +3.200 mm"], ["Bukaan tegak lurus dinding kanan"], ["Pasang dua bagian bawah dari dasar shaft.", "Masukkan bagian atas satu per satu dan sambung pada zona bukaan dengan hoist.", "Gunakan penyangga sementara tersertifikasi."]],
  "shaft-top-assembly": ["Zona 250 mm di atas dinding shaft: sisi kiri, kanan, dan belakang tertutup; hanya sisi depan memakai mesh lepas-pasang dengan rangka atas dan bawah 30 mm.", ["Dinding penutup noncombustible", "Rangka baja 30 mm", "Wire mesh removable", "Atap kaca 10 mm"], ["Top dinding shaft +4.930 mm", "Rangka bawah 30 mm", "Akses bersih depan 190 mm", "Rangka atas 30 mm", "Bawah kaca +5.180 mm", "Kaca 1.240 × 730 mm", "Overhang depan dan kanan 50 mm"], ["Rangka dan kaca horizontal"], ["Pasang Siku 5 serta tudung hujan sebelum penutupan.", "Jangan mengandalkan akses 190 mm untuk perakitan manusia.", "Buat mesh depan dapat dilepas untuk inspeksi."]],
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
  "complete-system": ["Complete Option D route from hood to rain hood. Two added elbows and a short vertical straight form a U-offset below the shaft wall and ring beam without a structural penetration.", ["1 mm stainless-steel hood", "0.5 mm rectangular duct and transitions", "30 mm integral flanges", "CKE CI-CDI250AZ-NO fan", "Brick shaft walls and structural roof"], ["1,500 × 600 mm hood", "350 × 150 mm main duct", "840 × 380 mm clear shaft", "4,930 mm shaft wall", "Rain-hood box +4,980 to +5,130 mm"], ["Seven 90° elbows", "Straight 3 rises 20.7°", "Hood slope 21.8°"], ["Survey every building datum before fabrication.", "Keep the practical column, ring beam, concrete, and reinforcement uncut.", "Install Elbow 5 before closing the mesh and glass roof."]],
  "duct-system": ["The complete duct route from the hood curb to the outdoor outlet through the ceiling and shaft.", ["0.5 mm galvanized/stainless sheet", "30 mm integral flanges at rectangular joints"], ["350 × 150 mm nominal rectangular section", "Ø250 mm fan collars"], ["Seven 90° elbows"], ["Seal every flange and joint.", "Support the duct independently from the hood and fan."]],
  "ceiling-route": ["The ceiling route uses three elbows to keep the 350 × 150 mm section flat and places the shaft route 10 mm clear of the left wall.", ["Flat 350 × 150 mm duct", "30 mm integral flanges"], ["Straight 1: 715 mm", "Straight 2: 235 mm", "Approx. 135/135 mm flange clearance below/above"], ["Elbows 1, 2, and 3: 90°"], ["Keep the current elevation.", "Verify the downlight, hangers, and structural roof before installation."]],
  "fan-chain": ["After Transition 2, Straight 3 rises slightly into a downward elbow, short vertical straight, and second elbow toward Elbow 4. The elbow pair forms a U-offset beneath the shaft wall.", ["0.5 mm transition and duct sheet", "CKE CI-CDI250AZ-NO fan", "30 mm integral flanges"], ["Each transition body: 250 mm", "Cylindrical collar: 40 mm", "Fan overall depth: 205 mm", "Straight 3: 225 mm plan and 85 mm rise", "Short vertical straight: 100 mm", "Full-flange clearance below shaft: 10 mm"], ["Fan axis horizontal", "Straight 3 rises 20.7°", "Two entry elbows: 90° each"], ["The fan is purchased equipment; do not fabricate it.", "Support the U-offset independently.", "Install and seal the paired flange between the second entry elbow and Elbow 4."]],
  "shaft-rise": ["Elbow 4 sits at the shaft-bottom corner and connects directly to four riser sections. The first three remain at the 1,200 mm maximum; the final section is lengthened to preserve the existing outlet elevation.", ["350 × 150 mm duct", "30 mm integral flanges", "Certified hoist and temporary supports"], ["Section 1: 1,200 mm (+60 to +1,260)", "Section 2: 1,200 mm (+1,260 to +2,460)", "Section 3: 1,200 mm (+2,460 to +3,660)", "Section 4: 1,120 mm (+3,660 to +4,780)", "10 mm flange-to-left-wall gap"], ["Shaft-entry elbow: 90°"], ["Install the lower two sections from the shaft base.", "Use a stack-and-lift sequence for the upper sections through the laundry opening.", "Bolt, seal, and support every joint."]],
  outlet: ["The upper elbow discharges through the front mesh zone into the rain hood and is installed before the shaft-top closure.", ["350 × 150 mm duct", "Hollow tapered rain hood", "Internal slip joint without external flange"], ["Rain hood: 350 × 150 mm", "Bottom depth 200; top depth 300 mm", "Box +4,980 to +5,130 mm", "20 mm above and below within the 190 mm access"], ["Elbow 5: 90°", "Tapered outlet face"], ["Install Elbow 5 before the mesh and glass are closed.", "Use a 40–50 mm internal slip overlap with continuous sealing.", "No external flange at the Elbow 5/rain-hood joint."]],
  "straight-1": ["Vertical duct from the hood curb to Elbow 1.", ["0.5 mm sheet", "Two 30 mm integral flanges with 12 holes each"], ["350 × 150 mm", "715 mm high", "410 × 210 mm flange envelope"], ["Normal to the hood top"], ["The flanges belong to Straight 1.", "Match the hood opening before installation."]],
  "elbow-1": ["The first elbow uses the same square-throat, radius-heel construction as Elbow 4 to turn vertical flow into the horizontal route.", ["0.5 mm sheet", "30 mm flanges at both ends", "Grease-tight joints"], ["350 × 150 mm minimum section", "350 × 350 mm side-view span", "0 mm inner-throat radius", "150 mm outer-heel radius", "200 mm straight neck before and after the curve"], ["90° bend", "90° square inner throat", "90° outer quarter-circle heel"], ["Retain the existing inlet and outlet faces so Straight 1 and Elbow 2 remain connected."]],
  "elbow-2": ["The second elbow turns the flat horizontal route toward Straight 2.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "275 mm centreline radius"], ["90° bend"], ["Maintain the flat duct orientation."]],
  "straight-2": ["Short flat duct filling the space between Elbows 2 and 3 after shifting the shaft route 10 mm right.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm section", "235 mm clear length"], ["Horizontal"], ["Measure 235 mm clear between connection faces."]],
  "elbow-3": ["The third elbow returns the route toward Straight 3 and the fan.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 mm", "275 mm centreline radius"], ["90° bend"], ["Align its outlet face with Straight 3."]],
  "straight-3": ["Short sloping offset after Transition 2, rising into the first U-offset elbow while retaining 350 × 150 mm end openings.", ["0.5 mm sheet", "30 mm flanges at both ends"], ["350 × 150 mm at both ends", "225 mm plan length", "85 mm rise"], ["20.7° above horizontal", "Vertical end faces"], ["Fabricate as a grease-tight oblique offset.", "Support it independently from the fan."]],
  "entry-elbow-1": ["The first square-throat/radius-heel elbow turns horizontal flow vertically downward.", ["0.5 mm sheet", "30 mm flanges at both ends"], ["350 × 150 mm minimum section", "250 × 250 mm span", "150 mm outer-heel radius", "100 mm straight neck"], ["90° bend", "90° square inner throat"], ["Connect directly to Straight 3 and the short vertical straight."]],
  "entry-drop": ["Short vertical straight between the two U-offset elbows.", ["0.5 mm sheet", "30 mm flanges at both ends"], ["350 × 150 × 100 mm"], ["Vertical"], ["Bolt and seal both flange pairs."]],
  "entry-elbow-2": ["The second square-throat/radius-heel elbow turns downward flow horizontally toward Elbow 4.", ["0.5 mm sheet", "30 mm flanges at both ends"], ["350 × 150 mm minimum section", "250 × 250 mm span", "150 mm outer-heel radius", "100 mm straight neck", "10 mm full-flange clearance below shaft"], ["90° bend", "90° square inner throat"], ["Retain the paired 30 mm flange between this outlet and Elbow 4's inlet.", "Continuously seal the joint."]],
  "transition-1": ["Transition from 350 × 150 mm rectangular to Ø250 mm round before the fan.", ["0.5 mm sheet", "Flange only at the rectangular end"], ["250 mm body", "Ø250 × 40 mm collar"], ["Concentric axis"], ["Do not add a rectangular flange to the round end."]],
  fan: ["Purchased centrifugal inline duct fan.", ["CKE CI-CDI250AZ-NO", "Ø250 mm collars"], ["380 mm overall width", "349 mm face; 335 mm body", "205 mm total depth", "25 mm collar at each end"], ["Horizontal axis"], ["Do not fabricate the fan.", "Electrical terminal is on the right; support foot is above."]],
  "transition-2": ["Transition after the fan from Ø250 mm round to 350 × 150 mm rectangular.", ["0.5 mm sheet", "Flange only at the rectangular end"], ["Ø250 × 40 mm collar", "250 mm body"], ["Concentric axis"], ["No rectangular flange at the round inlet."]],
  "elbow-4": ["Compact square-throat, radius-heel elbow at the shaft-bottom corner, turning the horizontal route into the vertical riser while retaining a 350 × 150 mm minimum airflow section.", ["0.5 mm sheet", "30 mm inlet and outlet flanges", "Grease-tight fabrication joints"], ["250 × 250 mm side-view body span", "0 mm inner-throat radius", "150 mm outer-heel radius", "100 mm straight neck before and after the curve", "Outlet +60 mm above shaft base", "10 mm inlet-flange clearance below shaft", "Centreline 215 mm from left wall"], ["90° bend", "90° square inner throat", "90° outer quarter-circle heel"], ["Assemble before raising the riser.", "Meet the inlet connector and Straight 4A outlet without gaps.", "Do not cut the ring beam, practical column, concrete, or reinforcement."]],
  "straight-4a": ["First vertical riser section beginning directly at Elbow 4's outlet.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +60; top +1,260 mm"], ["Vertical"], ["Install and support it from the shaft base."]],
  "straight-4b": ["Second vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +1,260; top +2,460 mm"], ["Vertical"], ["Bolt and seal the flange joint."]],
  "straight-4c": ["Third vertical riser section inside the shaft.", ["0.5 mm sheet", "30 mm flanges"], ["350 × 150 × 1,200 mm", "Bottom +2,460; top +3,660 mm"], ["Vertical"], ["Bolt and seal the flange joint."]],
  "straight-4d": ["The final riser section is lengthened so Elbow 5 and the rain hood retain their previous elevation.", ["0.5 mm sheet", "30 mm flange at the lower joint"], ["350 × 150 × 1,120 mm", "Bottom +3,660; top +4,780 mm"], ["Vertical"], ["Install before the upper structure is closed.", "Keep 20 mm between the outlet box and both access frames."]],
  "elbow-5": ["The upper elbow uses the same square-throat, radius-heel construction as Elbow 4 and is installed before the front mesh/frame and glass are closed.", ["0.5 mm sheet", "30 mm flange at the lower inlet only", "No external outlet flange", "Grease-tight joints"], ["350 × 150 mm minimum section", "350 × 350 mm side-view span", "0 mm inner-throat radius", "150 mm outer-heel radius", "200 mm straight neck before and after the curve", "Inlet +4,780 mm", "Outlet centre +5,055 mm"], ["90° bend", "90° square inner throat", "90° outer quarter-circle heel"], ["Retain the existing inlet and outlet faces.", "Use an internal slip connection to the rain hood."]],
  "rain-hood": ["A hollow tapered outlet centred within the 190 mm front access.", ["0.5 mm sheet", "Internal slip joint without external flange"], ["350 × 150 mm", "Bottom depth 200; top depth 300 mm", "Box bottom +4,980 mm", "Box top +5,130 mm"], ["Sloping outlet face"], ["Continuously seal the internal overlap.", "Keep 20 mm clear of the lower and upper frames."]],
  "building-context": ["Building geometry shows the room, ceiling, structural slab, brick shaft with one laundry working opening, front mesh assembly, and glass roof.", ["Brick shaft walls", "Structural slab/roof", "30 mm steel frame", "Front wire mesh", "Glass"], ["1,800 × 3,000 × 2,680 mm clear room", "840 × 380 mm clear shaft", "4,930 mm shaft wall", "250 mm upper zone", "1,240 × 730 × 10 mm glass", "50 mm glass overhang at front and right"], ["All building planes follow project datums"], ["Verify site datums.", "Do not cut the practical column, ring beam, concrete, or reinforcement."]],
  "room-structure": ["The room volume provides the datum for the hood, ceiling, downlight, and route to the shaft.", ["Building walls and floor"], ["1,800 mm clear width", "3,000 mm clear depth", "2,680 mm floor-to-ceiling height", "480 mm ceiling void"], ["Walls, floor, and ceiling are mutually square"], ["Confirm finished dimensions after plastering.", "Use the finished back-wall face as the duct-depth datum."]],
  "shaft-structure": ["The brick shaft contains the riser with a nominal 10 mm left-wall gap and one laundry working opening. The rear wall and lower structure remain intact.", ["Brick walls", "Existing practical column/ring beam", "Steel frame/lintel at the laundry opening", "Structural roof slab"], ["840 mm clear width", "380 mm clear depth", "4,930 mm wall height", "10 mm left flange gap"], ["Vertical shaft"], ["Do not cut the practical column, ring beam, slab, or reinforcement.", "Check wall plumb because the left gap is only 10 mm."]],
  "shaft-openings": ["Only the existing large right-wall working opening from the laundry room is used. Elbow 4 needs no new penetration because the route passes beneath the shaft wall.", ["Laundry-opening perimeter frame", "Brick shaft walls"], ["Laundry access: 380 × 1,700 mm; sill +1,500 mm"], ["Opening is normal to the right wall"], ["Keep the rear wall, practical column, and ring beam intact.", "Do not cut concrete or reinforcement."]],
  "shaft-side-access": ["The large right-wall opening provides worker access from the laundry floor and the working zone for stack-and-lift joints.", ["Steel perimeter frame", "Brick wall"], ["Width follows the 380 mm clear shaft depth", "1,700 mm high", "Sill +1,500 mm", "Top +3,200 mm"], ["Opening is normal to the right wall"], ["Install the lower two sections from the shaft base.", "Introduce upper pieces individually and join them in the opening using a hoist.", "Use certified temporary supports."]],
  "shaft-top-assembly": ["The 250 mm zone above the shaft wall is enclosed on the left, right, and rear; only the front has removable mesh between two 30 mm frames.", ["Non-combustible enclosing walls", "30 mm steel frames", "Removable wire mesh", "10 mm glass roof"], ["Shaft-wall top +4,930 mm", "30 mm lower frame", "190 mm clear front access", "30 mm upper frame", "Glass underside +5,180 mm", "1,240 × 730 mm glass", "50 mm front and right overhang"], ["Frames and glass are horizontal"], ["Install Elbow 5 and the rain hood before closure.", "Do not depend on the 190 mm opening for human assembly.", "Keep the front mesh removable for inspection."]],
  "ceiling-assembly": ["Ceiling and roof slab with one downlight positioned clear of the shaft walls and duct route.", ["Ceiling plane", "Roof slab", "One recessed downlight"], ["Ceiling elevation +930 mm in the model", "Ø165 mm trim", "Ø139 mm cut-out"], ["Downlight is normal to the ceiling"], ["Keep duct hangers clear of the opening.", "Preserve access to the lamp driver."]],
  downlight: ["The single downlight is moved 150 mm forward from its original surveyed position for duct clearance and sits completely outside the shaft-wall footprint.", ["Recessed lamp trim and body", "Ø139 mm ceiling cut-out"], ["Ø165 mm trim", "Ø139 mm cut-out", "Centre 932.5 mm from the left wall", "Centre 1,062.5 mm forward from the back wall", "Approx. 207 mm plan clearance to duct", "Approx. 120 mm vertical clearance to duct flange", "Approx. 1,065 mm trim-edge clearance to the nearest shaft wall"], ["Lamp axis is normal to the ceiling"], ["Keep hangers and the driver outside the duct envelope.", "Verify the ceiling frame before cutting."]]
};

for (const [key, [description, materials, measurements, angles, instructions]] of Object.entries(ductPartsEn)) {
  infoContent.en[key] = { description, materials, measurements, angles, instructions };
}
