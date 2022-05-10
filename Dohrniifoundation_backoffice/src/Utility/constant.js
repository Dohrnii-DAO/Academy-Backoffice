export const errorMessages = {
  name: {
    required: "Name is required",
  },
  first_name: {
    required: "First name is required",
  },
  last_name: {
    required: "Last name is required",
  },
  email: {
    required: "Email is required.",
    type: "Please enter a valid email",
  },
  number: {
    required: "Phone is required",
  },
  username: {
    required: "Username is required. Max length 100 symbols",
    type: "Please enter a valid username",
  },
  password: {
    required: "Password is required.",
    contain:
      "Password should contain atleast 1 upper-case & 1 lower-case & 1 special characters.",
    resetBlank: "Please enter the Password and confirm Password.",
    confirm: " Confirm password is required.",
  },
  checkbox: {
    required: "Checkbox is required",
  },
};

export const LoginPage = {
  login: {
    login: "Login",
    content: "Please login to your account",
    email: "Email address",
    password: "Password",
    forgotPassword: "Forgot Password?",
  },

  carousel: {
    strategyManagement: "Strategy management",
    strategyContent: "Manage your strategies,questionnaire and concepts",
    lessonManagement: "Lesson management",
    lessonContent: "Manage your strategies, questions and concepts",
  },

  reset: {
    resetPassword: "RESET PASSWORD",
    resetpassword: "Reset Password",
    confirmPassword: "Confirm Password",
    content:
      " Please enter the new password for reset password of your account",
  },
  ForgotPassword: {
    forgotPassword: "FORGOT PASSWORD",
    FORGOTpassword: "Forgot Password",
    confirmPassword: "Confirm Password",
    content: "Please enter the email address associated with your account",
  },
};

export const validationError = {
  field: {
    required: "Field is required.",
  },
  select: {
    required: "Select the required field.",
  },

  imagetype: {
    required: "File extension is not supported.",
  },
  imagesize: {
    required: "Image size should be between 36kb-1mb.",
  },
  emptySpace: {
    blank: "Field cannot be empty.",
  },
  url: {
    required: "Field is required.",
  },
  invaliPercentage: {
    required: "Enter valid percentage.",
  },
  invaliNumber: {
    required: "Enter valid number.",
  },
  invaliLimit: {
    required: "Enter valid Limit.",
  },
  invaliToken: {
    required: "Enter valid Token.",
  },
};

export const popUp = {
  delete: {
    content: "Are you sure you want to delete?",
    contentChapter:
      "As dependent chapter data will also be deleted for class quiz",
    contentChapterRelation:
      "As dependent lesson data will also be deleted for class quiz",
    contentLesson:
      "As dependent lesson data will also be deleted for class quiz",
    contentClass: "As dependent class data will also be deleted for class quiz",
  },
  decider: {
    content: "Select this question as a decider",
    decider: "Decider",
  },
};

export const notFoundPage = {
  fournotfour: "404",
  oops: "OPPS! Page Not Found",
  content:
    " Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.",
  returnBack: "Return Back",
};

export const alert = {
  message: {
    success: "Submitted successfully.",
    failure: "Error!",
    delete: "Deleted Successfully",
    update: "Updated successfully",
    MinAnswer: "Minimum two answer is required",
    error: "Error!",
  },
  matchPassword: {
    required: "Password and confirm password should be match.",
  },
};

export const name = {
  common: {
    illustration: "Illustration",
    description: "Description",
    shortDescription: "Short Description",
    title: "Title",
    type: "Type",
    selected: "Selected",
    modify: "Modified Date",
    action: "Actions",
    delete: "Delete",
    yes: "Yes",
    no: "No",
    IllustrationImage: "Illustration Image",
    upload: "Upload",
    browse: "Browse",
    answer: "Answer",
    concept: "Concept",
    save: "Submit",
    add: "Add",
    crop: "Crop",
    questionTpye: "Select Question Type",
    mcq: "MCQ",
    scale: "Scale",
    strategy: "Strategies",
    Choosestrategy: "Select Strategies",
    update: "Update",
    illustrationimage: "Illustration Image",
    // concept: "Concepts",
    Chooseconcept: "Select Concepts",
    conceptlist: "Concepts List",
    questionnair: "Questionnaire",
    questionType: "Questions Type",
    done: "Done",
    choosetype: "Choose Type",
    video: "Video",
    image: "Image",
    text: "Text",
    content: "Content",
    validurl: "Enter valid url.",
    gameicon: "Game Icon",
    chapter: "Chapters",
    category: "Category",
    categoryList: "Category List",
    maximum: "Maximum Successor (%)",
    minimum: "Minimum Successor (%)",
    lesson: "Lessons",
    selectLesson: "Select Lesson",
    class: "Class",
    classes: "Classes",
    selectClass: "Select Class",
    selectLevel: "Select Level",
    level: "Levels",
    timeLimit: "Time Limit",
    AtleastTwo: "Atleat two required.",
    addOtherToDelete: "Add other to delete this.",
    AlleadyExist: "Allready exist.",
    somethingwrong: "Something went wrong.",
    choosemp4: "Invalid format choose mp4 file.",
    EmptyData: "There are no records to display",
  },

  card: {
    dashboard: "Dashboard",
    lesson: "Lessons",
    chapter: "Chapters",
    question: "Questions",
    concept: "Concepts",
    strategies: "Strategies",
    questionnaire: "Questionnaires",
    investorProfile: " Strategies and investor's Profile",
    class: "Classes",
    faqPrivacy: "FAQ And Privacy Policy",
    faq: "FAQ's",
    privacy: "Privacy & Policy",
  },
  questionnaire: {
    questionnair: "Questionnaire",
    question: "Questions",
    questionType: "Questions Type",
  },
  strategy: {
    createstrategy: "Create Strategies",
    strategy: "Strategy",
  },
  concept: {
    createconcept: "Create Concept",
    concept: "Concepts",
  },
  faq: {
    faqAnswer: "Answer",
    faqQuestion: "Question",
    faq: "FAQ's",
  },
  question: {
    createquestion: "Question",
    question: "Questions",
    quiz: "Question",
    selectCorrect: "Select the correct answer.",
  },
  chapter: {
    reward80: "Reward DHN for 80%",
    reward90: "Reward DHN for 90%",
    reward100: "Reward DHN for 100%",
    TimeLimit: "Time Limit",
    CryptojellyUnlock: "Crypto Jelly To Unlock Quiz",
  },

  class: {
    createclass: "Class",
    class: "Classes",
    jellyfish: "JellyFish Token",
    xp: "XP Token Reward Per Question",
    dhn: "DHN Token",
    gameIcon: "Game Icon",
    QuestionLimit: "Question Limit",
    moreOrEqualQuesLimit: "Should be more or equal to questions limit.",
  },
};
