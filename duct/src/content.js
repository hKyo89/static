export const partTree = [{
  id: "hood",
  children: [
    {
      id: "side-panels",
      children: ["left-side", "left-flange", "right-side", "right-flange"]
    },
    {
      id: "top-panel",
      children: ["top-cover", "exhaust-curb"]
    },
    {
      id: "back-panel",
      children: [
        "rear-panel",
        "cable-duct",
        { id: "mounting-rails", children: ["upper-rail", "lower-rail"] }
      ]
    },
    {
      id: "bottom-panels",
      children: [
        "rear-bottom",
        "rear-grille-lip",
        "l5-support",
        "front-face",
        "front-grille-lip",
        "light-panel",
        { id: "led-lights", children: ["led-1", "led-2", "led-3"] }
      ]
    },
    {
      id: "removable-grilles",
      children: ["removable-grille-1", "removable-grille-2", "removable-grille-3"]
    }
  ]
}];

export const uiText = {
  id: {
    viewerTitle: "Viewer fabrikasi hood",
    viewerHint: "Putar dan periksa setiap komponen",
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
    completeCaption: "Hood lengkap — lebar luar 1.500 mm"
  },
  en: {
    viewerTitle: "Hood fabrication viewer",
    viewerHint: "Rotate and inspect each component",
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
    completeCaption: "Complete hood — 1,500 mm overall width"
  }
};

export const partLabels = {
  id: {
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
  },
  en: {
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
    "removable-grille-3": "Removable grille 3"
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
  "cable-duct": "back-panel",
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
