const TRANSLATIONS = {
  // menu
  MENU_HOME: {
    ko: "홈",
    en: "Home",
  },
  MENU_PROFILE: {
    ko: "프로필",
    en: "Profile",
  },
  MENU_SEARCH: {
    ko: "검색",
    en: "Search",
  },
  MENU_NOTI: {
    ko: "알림",
    en: "Alert",
  },
  MENU_LOGOUT: {
    ko: "로그아웃",
    en: "Logout",
  },
  MENU_LOGIN: {
    ko: "로그인",
    en: "Login",
  },
  MENU_SIGNUP: {
    ko: "회원가입",
    en: "Signup",
  },
  // button
  BUTTON_FOLLOWING: {
    ko: "팔로잉",
    en: "Following",
  },
  BUTTON_FOLLOW: {
    ko: "팔로우",
    en: "Follow",
  },
  BUTTON_EDIT: {
    ko: "수정",
    en: "Edit",
  },
  BUTTON_DELETE: {
    ko: "삭제",
    en: "Delete",
  },
  BUTTON_EDIT_PROFILE: {
    ko: "프로필 수정",
    en: "Edit Profile",
  },
  BUTTON_COMMENT: {
    ko: "댓글 입력",
    en: "Comment",
  },
  // post
  NO_POSTS: {
    ko: "게시글이 없습니다",
    en: "No Posts",
  },
  POST_PLACEHOLDER: {
    ko: "내용을 입력해주세요.",
    en: "What is happening?",
  },
  POST_HASHTAG: {
    ko: "해시태그 + 스페이스바 입력",
    en: "Enter hashtags with spacebar",
  },
  POST_CHANGE_IMAGE: {
    ko: "이미지 변경",
    en: "Change Image",
  },
  NAME_PLACEHOLDER: {
    ko: "이름",
    en: "Name",
  },
  // tabs
  TAB_FOLLOWING: {
    ko: "팔로잉",
    en: "Following",
  },
  TAB_ALL: {
    ko: "전체",
    en: "For You",
  },
  TAB_LIKES: {
    ko: "좋아요",
    en: "Likes",
  },
  TAB_MY: {
    ko: "내가쓴 글",
    en: "My Tweets",
  },
  // search
  SEARCH_HASHTAGS: {
    ko: "해시태그 검색",
    en: "Search Hashtags",
  },
  // profile
  PROFILE_NAME: {
    ko: "사용자님",
    en: "User",
  },
  // notification
  NO_NOTIFICATIONS: {
    ko: "알림이 없습니다",
    en: "No notifications",
  },
  // signin, signup
  FORM_EMAIL: {
    ko: "이메일",
    en: "Email",
  },
  FORM_PASSWORD: {
    ko: "비밀번호",
    en: "Password",
  },
  FORM_PASSWORD_CHECK: {
    ko: "비밀번호 확인",
    en: "Confirm Password",
  },
  NO_ACCOUNT: {
    ko: "계정이 없으신가요?",
    en: "No Account?",
  },
  YES_ACCOUNT: {
    ko: "계정이 있으신가요?",
    en: "Already have account?",
  },
  LOGIN_WITH_GOOGLE: {
    ko: "Google 로그인",
    en: "Continue with Google",
  },
  LOGIN_WITH_GITHUB: {
    ko: "Github 로그인",
    en: "Continue with Github",
  },
  SIGNUP_GOOGLE: {
    ko: "Google 회원가입",
    en: "Continue with Google",
  },
  SIGNUP_GITHUB: {
    ko: "Github 회원가입",
    en: "Continue with Github",
  },
  SIGNUP_LINK: {
    ko: "회원가입하기",
    en: "Sign up",
  },
  SIGNIN_LINK: {
    ko: "로그인하기",
    en: "Login",
  },

  // Comment
  COMMENT_PLACEHOLDER: {
    ko: "댓글을 입력해주세요.",
    en: "Enter a comment.",
  },

  //Alert (toast)
  ALERT_LOGOUT: {
    ko: "로그아웃 되었습니다.",
    en: "You have been logged out.",
  },
  ALERT_EDIT_PROFILE: {
    ko: "프로필이 수정되었습니다.",
    en: "Your profile has been updated.",
  },
  ALERT_EDIT_PROFILE_ERROR: {
    ko: "프로필 수정 중 에러가 발생했습니다.",
    en: "An error occurred while updating the profile.",
  },
  ALERT_SAME_TAG: {
    ko: "동일한 태그가 존재합니다.",
    en: "A tag with the same name already exists.",
  },
  ALERT_REGIST_POST: {
    ko: "게시글이 등록되었습니다.",
    en: "The post has been successfully registered.",
  },
  ALERT_REGIST_POST_ERROR: {
    ko: "게시글 등록 중에 문제가 발생했습니다.",
    en: "An error occurred while registering the post.",
  },
  CONFIRM_DELETE_POST: {
    ko: "게시글을 삭제하시겠습니까?",
    en: "Are you sure you want to delete the post?",
  },
  ALERT_DELETE_POST: {
    ko: "게시글을 삭제하였습니다.",
    en: "The post has been deleted.",
  },
  ALERT_FOLLOW: {
    ko: "팔로우 했습니다.",
    en: "You have followed.",
  },
  ALERT_UNFOLLOW: {
    ko: "팔로우를 취소했습니다.",
    en: "You have unfollowed.",
  },
  ALERT_FOLLOW_YOU: {
    ko: "이(가) 회원님을 팔로우 했습니다.",
    en: "has followed you.",
  },
  ALERT_COMMENT_POST: {
    ko: "{{postContent}}게시글에 댓글이 작성되었습니다.",
    en: "A comment has been posted on the {{postContent}} post.",
  },
  ALERT_COMMENT_ADD: {
    ko: "댓글을 추가했습니다.",
    en: "A comment has been added.",
  },
  ALERT_NO_SEARCH_LIST: {
    ko: "검색 결과가 없습니다.",
    en: "No results found.",
  },
  ALERT_INVALID_EMAIL: {
    ko: "이메일 형식이 올바르지 않습니다.",
    en: "The email format is invalid.",
  },
  ALERT_PASSWORD_LENGTH: {
    ko: "비밀번호는 8자리 이상이어야 합니다.",
    en: "The password must be at least 8 characters long.",
  },
  ALERT_PASSWORD_NOT_MATCH: {
    ko: "비밀번호가 일치하지 않습니다.",
    en: "The passwords do not match.",
  },
  ALERT_COMPLETE_REGISTRATION: {
    ko: "회원가입이 완료되었습니다.",
    en: "Registration is complete.",
  },
  ALERT_UNSUPPORTED_LOGIN: {
    ko: "지원되지 않는 로그인입니다.",
    en: "This login is not supported.",
  },
  ALERT_LOGIN: {
    ko: "로그인 하였습니다.",
    en: "You have logged in.",
  },
  ALERT_NO_POST: {
    ko: "게시글 정보를 찾을 수 없습니다.",
    en: "Post information could not be found.",
  },
  ALERT_DELETE_IMG_ERROR: {
    ko: "기존 이미지 삭제 중 에러가 발생했습니다.",
    en: "An error occurred while deleting the existing image.",
  },
  ALERT_UPDATE_POST: {
    ko: "게시글이 수정되었습니다.",
    en: "The post has been updated.",
  },
  ALERT_UPDATE_POST_ERROR: {
    ko: "게시글 수정 중 에러가 발생했습니다.",
    en: "An error occurred while updating the post.",
  },
  ALERT_NO_CHANGE_CONTENT: {
    ko: "수정된 내용이 없습니다.",
    en: "There are no changes to update.",
  },
  CONFIRM_DELETE_COMMENT: {
    ko: "댓글을 삭제하시겠습니까?",
    en: "Are you sure you want to delete the comment?",
  },
  ALERT_DELETE_COMMENT: {
    ko: "댓글을 삭제했습니다.",
    en: "The comment has been deleted.",
  },
  ALERT_DELETE_COMMENT_ERROR: {
    ko: "댓글을 삭제하지 못했습니다.",
    en: "Failed to delete the comment.",
  },
};

export default TRANSLATIONS;
