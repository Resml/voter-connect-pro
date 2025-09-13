import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    'dashboard.title': 'Voter Management',
    'dashboard.welcome': 'Welcome',
    'dashboard.online': 'Online',
    'dashboard.mainDashboard': 'Main Dashboard',
    'dashboard.selectOption': 'Select an option to access features',
    'dashboard.reportsSearch': 'Reports & Search',
    'dashboard.selectCategory': 'Select a category to search voter data',
    'dashboard.backToMain': '← Back to Main',
    'dashboard.report': 'Report',
    'dashboard.userMgt': 'User Mgt',
    'dashboard.statistics': 'Statistic',
    'dashboard.boothMgt': 'Booth Mgt',
    'dashboard.survey': 'Survey',
    'dashboard.settings': 'Setting',
    'dashboard.sync': 'Sync',
    'dashboard.about': 'About Us',
    'dashboard.electionMgt': 'निवडणूक व्यवस्थापन',
    'dashboard.query': 'क्वेरी',
    'dashboard.logout': 'Logout',
    
    // Reports
    'reports.allReports': 'All Reports',
    'reports.name': 'Name wise',
    'reports.alphabetical': 'Alphabetical',
    'reports.booth': 'Boothwise',
    'reports.age': 'Agewise',
    'reports.duplicate': 'Duplicate voters',
    'reports.mobile': 'Mobile No',
    'reports.address': 'Address wise',
    'reports.lastname': 'LastName wise',
    'reports.caste': 'Caste wise list',
    'reports.favour': 'Favour wise',
    'reports.nagar': 'Nagar wise',
    'reports.society': 'Society wise',
    'reports.dead': 'Dead wise',
    'reports.birthday': 'Birthday list',
    'reports.role': 'Role list',
    'reports.nonvoters': 'Non voters list',
    'reports.survey': 'Survey list',
    'reports.visited': 'Visited list',
    'reports.partyworker': 'Party Worker',
    'reports.education': 'Education',
    'reports.profession': 'Profession',
    'reports.prabhag': 'Prabhag',
    
    // Main Options
    'main.report': 'Report',
    'main.userMgt': 'User Mgt',
    'main.statistics': 'Statistics',
    'main.boothMgt': 'Booth Mgt',
    'main.survey': 'Survey',
    'main.setting': 'Setting',
    'main.election': 'Election Management',
    'main.query': 'Query',
    'main.sync': 'Sync',
    'main.aboutUs': 'About Us',
    
    // Search Options
    'search.nameWise': 'Name wise',
    'search.alphabetical': 'Alphabetical',
    'search.boothWise': 'Booth wise',
    'search.ageWise': 'Age wise',
    'search.addressWise': 'Address wise',
    'search.lastNameWise': 'Last Name wise',
    'search.mobileNo': 'Mobile No',
    'search.casteWise': 'Caste wise',
    'search.favourWise': 'Favour wise',
    'search.nagarWise': 'Nagar wise',
    'search.societyWise': 'Society wise',
    'search.deadWise': 'Dead wise',
    'search.birthdayList': 'Birthday list',
    'search.nonVotersList': 'Non-voters list',
    'search.roleList': 'Role list',
    'search.visitedList': 'Visited list',
    'search.partyWorker': 'Party Worker',
    'search.education': 'Education',
    'search.profession': 'Profession',
    
    // Search Interface
    'search.searchPlaceholder': 'Search by name, mobile, card no, AC no, address...',
    'search.allACNumbers': 'All AC Numbers',
    'search.allGender': 'All Gender',
    'search.male': 'Male',
    'search.female': 'Female',
    'search.other': 'Other',
    'search.export': 'Export',
    'search.results': 'results found',
    'search.noResults': 'No Results Found',
    'search.adjustCriteria': 'Try adjusting your search criteria',
    
    // Voter Details
    'voter.cardNo': 'Card No',
    'voter.mobile': 'Mobile',
    'voter.address': 'Address',
    'voter.boothNo': 'Booth No',
    'voter.notAvailable': 'Not available',
    'voter.active': 'Active',
    'voter.years': 'years',
    
    // Stats
    'stats.totalVoters': 'Total Voters',
    'stats.active': 'Active',
    'stats.booths': 'Booths',
    'stats.areas': 'Areas',
    
    // Actions
    'action.importData': 'Import Data',
    'action.exportData': 'Export Data',
    'action.about': 'About',
    'action.logout': 'Logout',
    'action.back': 'Back',
    
    // Language
    'language.english': 'English',
    'language.marathi': 'मराठी',
  },
  mr: {
    // Dashboard
    'dashboard.title': 'मतदार व्यवस्थापन',
    'dashboard.welcome': 'स्वागत',
    'dashboard.online': 'ऑनलाइन',
    'dashboard.mainDashboard': 'मुख्य डॅशबोर्ड',
    'dashboard.selectOption': 'वैशिष्ट्यांमध्ये प्रवेश करण्यासाठी एक पर्याय निवडा',
    'dashboard.reportsSearch': 'अहवाल आणि शोध',
    'dashboard.selectCategory': 'मतदार डेटा शोधण्यासाठी एक श्रेणी निवडा',
    'dashboard.backToMain': '← मुख्य वर परत',
    'dashboard.report': 'अहवाल',
    'dashboard.userMgt': 'वापरकर्ता व्यवस्थापन',
    'dashboard.statistics': 'आकडेवारी',
    'dashboard.boothMgt': 'बूथ व्यवस्थापन',
    'dashboard.survey': 'सर्वेक्षण',
    'dashboard.settings': 'सेटिंग्ज',
    'dashboard.sync': 'सिंक',
    'dashboard.about': 'आमच्याबद्दल',
    'dashboard.electionMgt': 'निवडणूक व्यवस्थापन',
    'dashboard.query': 'क्वेरी',
    'dashboard.logout': 'लॉग आउट',
    
    // Reports
    'reports.allReports': 'सर्व अहवाल',
    'reports.name': 'नावानुसार',
    'reports.alphabetical': 'वर्णानुक्रमे',
    'reports.booth': 'बूथनुसार',
    'reports.age': 'वयानुसार',
    'reports.duplicate': 'डुप्लिकेट मतदार',
    'reports.mobile': 'मोबाइल नं',
    'reports.address': 'पत्त्यानुसार',
    'reports.lastname': 'आडनाव',
    'reports.caste': 'जातीनुसार यादी',
    'reports.favour': 'अनुकूल',
    'reports.nagar': 'नगरानुसार',
    'reports.society': 'सोसायटीनुसार',
    'reports.dead': 'मृत यादी',
    'reports.birthday': 'वाढदिवस यादी',
    'reports.role': 'भूमिका यादी',
    'reports.nonvoters': 'अमतदार यादी',
    'reports.survey': 'सर्वेक्षण यादी',
    'reports.visited': 'भेट दिलेली यादी',
    'reports.partyworker': 'पक्षीय कार्यकर्ता',
    'reports.education': 'शिक्षण',
    'reports.profession': 'व्यवसाय',
    'reports.prabhag': 'प्रभाग',
    
    // Main Options
    'main.report': 'अहवाल',
    'main.userMgt': 'कार्यकर्ता नियोजन',
    'main.statistics': 'आकडेवारी',
    'main.boothMgt': 'बूथ नियोजन',
    'main.survey': 'सर्वे',
    'main.setting': 'सेटिंग',
    'main.election': 'निवडणूक व्यवस्थापन',
    'main.query': 'क्वेरी',
    'main.sync': 'सिंक',
    'main.aboutUs': 'आमच्याबद्दल',
    
    // Search Options
    'search.nameWise': 'नावानुसार',
    'search.alphabetical': 'वर्णमालेनुसार',
    'search.boothWise': 'बूथनुसार',
    'search.ageWise': 'वयानुसार',
    'search.addressWise': 'पत्त्यानुसार',
    'search.lastNameWise': 'आडनावानुसार',
    'search.mobileNo': 'मोबाइल नंबर',
    'search.casteWise': 'जातीनुसार',
    'search.favourWise': 'पसंतीनुसार',
    'search.nagarWise': 'नगरानुसार',
    'search.societyWise': 'सोसायटीनुसार',
    'search.deadWise': 'मृत',
    'search.birthdayList': 'वाढदिवसाची यादी',
    'search.nonVotersList': 'गैर-मतदार यादी',
    'search.roleList': 'भूमिका यादी',
    'search.visitedList': 'भेट दिलेली यादी',
    'search.partyWorker': 'पक्षीय कार्यकर्ता',
    'search.education': 'शिक्षण',
    'search.profession': 'व्यवसाय',
    
    // Search Interface
    'search.searchPlaceholder': 'नाव, मोबाइल, कार्ड नं, AC नं, पत्त्याने शोधा...',
    'search.allACNumbers': 'सर्व AC नंबर',
    'search.allGender': 'सर्व लिंग',
    'search.male': 'पुरुष',
    'search.female': 'महिला',
    'search.other': 'इतर',
    'search.export': 'निर्यात',
    'search.results': 'परिणाम सापडले',
    'search.noResults': 'कोणते परिणाम सापडले नाहीत',
    'search.adjustCriteria': 'तुमचे शोध निकष समायोजित करून पहा',
    
    // Voter Details
    'voter.cardNo': 'कार्ड नं',
    'voter.mobile': 'मोबाइल',
    'voter.address': 'पत्ता',
    'voter.boothNo': 'बूथ नं',
    'voter.notAvailable': 'उपलब्ध नाही',
    'voter.active': 'सक्रिय',
    'voter.years': 'वर्षे',
    
    // Stats
    'stats.totalVoters': 'एकूण मतदार',
    'stats.active': 'सक्रिय',
    'stats.booths': 'बूथ',
    'stats.areas': 'क्षेत्रे',
    
    // Actions
    'action.importData': 'डेटा आयात',
    'action.exportData': 'डेटा निर्यात',
    'action.about': 'आमच्याबद्दल',
    'action.logout': 'लॉग आउट',
    'action.back': 'मागे',
    
    // Language
    'language.english': 'English',
    'language.marathi': 'मराठी',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};