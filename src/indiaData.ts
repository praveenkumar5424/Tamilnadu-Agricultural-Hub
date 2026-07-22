export interface StateInfo {
  id: string;
  name: string;
  nameLocal: string;
  crops: string[];
  districts: string[];
}

export const INDIA_STATES: StateInfo[] = [
  {
    id: "andhra_pradesh",
    name: "Andhra Pradesh",
    nameLocal: "ఆంధ్రప్రదేశ్",
    crops: ["Paddy", "Cotton", "Chilli", "Groundnut", "Sugarcane", "Mango"],
    districts: [
      "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", 
      "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", 
      "Vizianagaram", "West Godavari", "YSR Kadapa", "Manyam", "Alluri Sitharama Raju", 
      "Anakapalli", "Kakinada", "Kona Seema", "Eluru", "NTR", "Bapatla", 
      "Palnadu", "Nandyal", "Sri Sathya Sai", "Annamayya", "Tirupati"
    ]
  },
  {
    id: "arunachal_pradesh",
    name: "Arunachal Pradesh",
    nameLocal: "अरुणाचल प्रदेश",
    crops: ["Rice", "Maize", "Millet", "Potato", "Ginger", "Mustard"],
    districts: [
      "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", 
      "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", 
      "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", 
      "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding", "Kamle", 
      "Pakke Kessang", "Lepa Rada", "Shi Yomi"
    ]
  },
  {
    id: "assam",
    name: "Assam",
    nameLocal: "অসম",
    crops: ["Rice", "Tea", "Jute", "Mustard", "Potato", "Sugarcane"],
    districts: [
      "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
      "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", 
      "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", 
      "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", 
      "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", 
      "Tinsukia", "Udalguri", "West Karbi Anglong", "Bajali", "Tamulpur"
    ]
  },
  {
    id: "bihar",
    name: "Bihar",
    nameLocal: "बिहार",
    crops: ["Paddy", "Wheat", "Maize", "Sugarcane", "Potato", "Litchi", "Mustard"],
    districts: [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", 
      "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", 
      "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", 
      "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", 
      "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", 
      "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ]
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    nameLocal: "छत्तीसगढ़",
    crops: ["Paddy", "Maize", "Groundnut", "Soybean", "Gram", "Niger"],
    districts: [
      "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", 
      "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", 
      "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", 
      "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", 
      "Rajnandgaon", "Sukma", "Surajpur", "Surguja", "Khairagarh-Chhuikhadan-Gandai", 
      "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki", 
      "Sarangarh-Bilaigarh", "Sakti"
    ]
  },
  {
    id: "goa",
    name: "Goa",
    nameLocal: "गोंय",
    crops: ["Paddy", "Cashew", "Coconut", "Ragi", "Mango"],
    districts: ["North Goa", "South Goa"]
  },
  {
    id: "gujarat",
    name: "Gujarat",
    nameLocal: "ગુજરાત",
    crops: ["Cotton", "Groundnut", "Castor", "Bajra", "Wheat", "Mustard"],
    districts: [
      "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", 
      "Bhavnagar", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", 
      "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", 
      "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", 
      "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad", 
      "Botad", "Chhota Udaipur"
    ]
  },
  {
    id: "haryana",
    name: "Haryana",
    nameLocal: "हरियाणा",
    crops: ["Wheat", "Paddy", "Mustard", "Sugarcane", "Cotton", "Bajra"],
    districts: [
      "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", 
      "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", 
      "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", 
      "Sonipat", "Yamunanagar"
    ]
  },
  {
    id: "himachal_pradesh",
    name: "Himachal Pradesh",
    nameLocal: "हिमाचल प्रदेश",
    crops: ["Apple", "Maize", "Paddy", "Wheat", "Potato", "Ginger"],
    districts: [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", 
      "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ]
  },
  {
    id: "jammu_kashmir",
    name: "Jammu & Kashmir",
    nameLocal: "جموں و کشمیر",
    crops: ["Saffron", "Apple", "Paddy", "Maize", "Wheat", "Walnut"],
    districts: [
      "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", 
      "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", 
      "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ]
  },

  {
    id: "karnataka",
    name: "Karnataka",
    nameLocal: "ಕರ್ನಾಟಕ",
    crops: ["Ragi", "Paddy", "Maize", "Cotton", "Groundnut", "Sugarcane", "Coffee", "Coconut"],
    districts: [
      "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", 
      "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", 
      "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", 
      "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", 
      "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Vijayapura", 
      "Yadgir", "Vijayanagara"
    ]
  },
  {
    id: "kerala",
    name: "Kerala",
    nameLocal: "കേരളം",
    crops: ["Coconut", "Rubber", "Paddy", "Black Pepper", "Cardamom", "Tapioca", "Arecanut"],
    districts: [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", 
      "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", 
      "Thiruvananthapuram", "Thrissur", "Wayanad"
    ]
  },
  {
    id: "madhya_pradesh",
    name: "Madhya Pradesh",
    nameLocal: "मध्य प्रदेश",
    crops: ["Soybean", "Wheat", "Gram", "Maize", "Mustard", "Cotton"],
    districts: [
      "Anuppur", "Alirajpur", "Ashoknagar", "Balaghat", "Barwani", "Betul", 
      "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", 
      "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", 
      "Narmadapuram", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", 
      "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", 
      "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", 
      "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", 
      "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha", "Mauganj"
    ]
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    nameLocal: "महाराष्ट्र",
    crops: ["Cotton", "Sugarcane", "Soybean", "Onion", "Jowar", "Bajra", "Mango", "Grapes"],
    districts: [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", 
      "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", 
      "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", 
      "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", 
      "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Solapur", 
      "Thane", "Wardha", "Washim", "Yavatmal", "Sindhudurg"
    ]
  },
  {
    id: "manipur",
    name: "Manipur",
    nameLocal: "মণিপুর",
    crops: ["Rice", "Maize", "Pineapple", "Potato", "Ginger"],
    districts: [
      "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", 
      "Senapati", "Tamenglong", "Thoubal", "Ukhrul", "Kangpokpi", "Tengnoupal", 
      "Pherzawl", "Noney", "Kamjong", "Jiribam", "Kakching"
    ]
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    nameLocal: "मेघालय",
    crops: ["Rice", "Maize", "Potato", "Ginger", "Turmeric", "Pineapple"],
    districts: [
      "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", 
      "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", 
      "West Garo Hills", "West Jaintia Hills", "West Khasi Hills", "Eastern West Khasi Hills"
    ]
  },
  {
    id: "mizoram",
    name: "Mizoram",
    nameLocal: "மிசோரம்",
    crops: ["Rice", "Maize", "Turmeric", "Ginger", "Banana"],
    districts: [
      "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", 
      "Saiha", "Serchhip", "Hnahthial", "Khawzawl", "Saitual"
    ]
  },
  {
    id: "nagaland",
    name: "Nagaland",
    nameLocal: "नागालैंड",
    crops: ["Rice", "Maize", "Millet", "Potato", "Cardamom"],
    districts: [
      "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokochung", "Mon", 
      "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto", "Noklak", 
      "Chumoukedima", "Niuland", "Tseminyu", "Shamator"
    ]
  },
  {
    id: "odisha",
    name: "Odisha",
    nameLocal: "ওড়িশা",
    crops: ["Paddy", "Groundnut", "Mustard", "Sugarcane", "Potato", "Turmeric"],
    districts: [
      "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
      "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", 
      "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", 
      "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
      "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
    ]
  },
  {
    id: "punjab",
    name: "Punjab",
    nameLocal: "ਪੰਜਾਬ",
    crops: ["Wheat", "Paddy", "Cotton", "Sugarcane", "Mustard", "Potato"],
    districts: [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", 
      "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", 
      "Malerkotla", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", 
      "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"
    ]
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    nameLocal: "राजस्थान",
    crops: ["Bajra", "Mustard", "Guar", "Wheat", "Gram", "Groundnut"],
    districts: [
      "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", 
      "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", 
      "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", 
      "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", 
      "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur", 
      "Anupgarh", "Balotra", "Beawar", "Deeg", "Didwana-Kuchaman", "Dudu", 
      "Gangapur City", "Jaipur Rural", "Jodhpur Rural", "Kotputli-Behror", 
      "Khairthal-Tijara", "Neem Ka Thana", "Phalodi", "Salumbar", "Sanchore", "Shahpura"
    ]
  },
  {
    id: "sikkim",
    name: "Sikkim",
    nameLocal: "सिक्किम",
    crops: ["Cardamom", "Ginger", "Maize", "Orange", "Potato"],
    districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim", "Pakyong", "Soreng"]
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    nameLocal: "தமிழ்நாடு",
    crops: ["Paddy", "Turmeric", "Cotton", "Groundnut", "Sugarcane", "Tapioca", "Coconut", "Banana"],
    districts: [
      "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
      "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
      "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", 
      "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", 
      "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thiruvallur", "Thiruvannamalai", 
      "Thiruvarur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", 
      "Tiruppur", "Vellore", "Viluppuram", "Virudhunagar"
    ]
  },
  {
    id: "telangana",
    name: "Telangana",
    nameLocal: "తెలంగాణ",
    crops: ["Cotton", "Paddy", "Maize", "Chilli", "Turmeric", "Groundnut"],
    districts: [
      "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", 
      "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", 
      "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", 
      "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", 
      "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", 
      "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
    ]
  },
  {
    id: "tripura",
    name: "Tripura",
    nameLocal: "ত্রিপুরা",
    crops: ["Rice", "Rubber", "Pineapple", "Potato", "Jute"],
    districts: [
      "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", 
      "Unakoti", "West Tripura"
    ]
  },
  {
    id: "uttar_pradesh",
    name: "Uttar Pradesh",
    nameLocal: "उत्तर प्रदेश",
    crops: ["Wheat", "Sugarcane", "Paddy", "Potato", "Mustard", "Maize", "Mango"],
    districts: [
      "Agra", "Aligarh", "Prayagraj", "Ambedkar Nagar", "Amethi", "Amroha", 
      "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", 
      "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Buldandshahr", 
      "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Ayodhya", "Farrukhabad", 
      "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", 
      "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", 
      "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", 
      "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", 
      "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", 
      "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", 
      "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", 
      "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ]
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    nameLocal: "उत्तराखंड",
    crops: ["Ragi", "Wheat", "Paddy", "Potato", "Apple", "Peach"],
    districts: [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", 
      "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", 
      "Udham Singh Nagar", "Uttarkashi"
    ]
  },
  {
    id: "west_bengal",
    name: "West Bengal",
    nameLocal: "পশ্চিমবঙ্গ",
    crops: ["Paddy", "Jute", "Potato", "Tea", "Mustard", "Mango"],
    districts: [
      "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", 
      "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", 
      "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", 
      "Paschim Bardhaman", "Purba Bardhaman", "Purba Medinipur", "Purulia", 
      "South 24 Parganas", "Uttar Dinajpur"
    ]
  },
  {
    id: "delhi",
    name: "Delhi (UT)",
    nameLocal: "दिल्ली",
    crops: ["Wheat", "Mustard", "Vegetables", "Flowers"],
    districts: [
      "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
      "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", 
      "South West Delhi", "West Delhi"
    ]
  },
  {
    id: "puducherry",
    name: "Puducherry (UT)",
    nameLocal: "புதுச்சேரி",
    crops: ["Paddy", "Coconut", "Sugarcane", "Banana"],
    districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"]
  }
];
