declare namespace API {
  type aiGenerateQuestionUsingPOSTParams = {
    /** questionId */
    questionId?: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCommentVO_ = {
    code?: number;
    data?: CommentVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListCommentVO_ = {
    code?: number;
    data?: CommentVO[];
    message?: string;
  };

  type BaseResponseListHotTagsVO_ = {
    code?: number;
    data?: HotTagsVO[];
    message?: string;
  };

  type BaseResponseListInt_ = {
    code?: number;
    data?: number[];
    message?: string;
  };

  type BaseResponseListMyCommentVO_ = {
    code?: number;
    data?: MyCommentVO[];
    message?: string;
  };

  type BaseResponseListQuestionFavourCountDTO_ = {
    code?: number;
    data?: QuestionFavourCountDTO[];
    message?: string;
  };

  type BaseResponseListQuestionViewCountDTO_ = {
    code?: number;
    data?: QuestionViewCountDTO[];
    message?: string;
  };

  type BaseResponseListQuestionVO_ = {
    code?: number;
    data?: QuestionVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageComment_ = {
    code?: number;
    data?: PageComment_;
    message?: string;
  };

  type BaseResponsePageCommentVO_ = {
    code?: number;
    data?: PageCommentVO_;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageQuestion_ = {
    code?: number;
    data?: PageQuestion_;
    message?: string;
  };

  type BaseResponsePageQuestionBank_ = {
    code?: number;
    data?: PageQuestionBank_;
    message?: string;
  };

  type BaseResponsePageQuestionBankQuestion_ = {
    code?: number;
    data?: PageQuestionBankQuestion_;
    message?: string;
  };

  type BaseResponsePageQuestionBankQuestionVO_ = {
    code?: number;
    data?: PageQuestionBankQuestionVO_;
    message?: string;
  };

  type BaseResponsePageQuestionBankVO_ = {
    code?: number;
    data?: PageQuestionBankVO_;
    message?: string;
  };

  type BaseResponsePageQuestionMark_ = {
    code?: number;
    data?: PageQuestionMark_;
    message?: string;
  };

  type BaseResponsePageQuestionMarkVO_ = {
    code?: number;
    data?: PageQuestionMarkVO_;
    message?: string;
  };

  type BaseResponsePageQuestionVO_ = {
    code?: number;
    data?: PageQuestionVO_;
    message?: string;
  };

  type BaseResponsePageRedeem_ = {
    code?: number;
    data?: PageRedeem_;
    message?: string;
  };

  type BaseResponsePageRedeemVO_ = {
    code?: number;
    data?: PageRedeemVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseQuestionBankQuestionVO_ = {
    code?: number;
    data?: QuestionBankQuestionVO;
    message?: string;
  };

  type BaseResponseQuestionBankVO_ = {
    code?: number;
    data?: QuestionBankVO;
    message?: string;
  };

  type BaseResponseQuestionMarkVO_ = {
    code?: number;
    data?: QuestionMarkVO;
    message?: string;
  };

  type BaseResponseQuestionVO_ = {
    code?: number;
    data?: QuestionVO;
    message?: string;
  };

  type BaseResponseRedeemVO_ = {
    code?: number;
    data?: RedeemVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type Comment = {
    ancestorId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    parentId?: number;
    questionId?: number;
    updateTime?: string;
    userId?: number;
  };

  type CommentAddRequest = {
    content?: string;
    parentId?: number;
    questionId?: number;
  };

  type CommentEditRequest = {
    content?: string;
    id?: number;
  };

  type CommentQueryRequest = {
    ancestorId?: number;
    content?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    parentId?: number;
    questionId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type CommentUpdateRequest = {
    content?: string;
    id?: number;
    parentId?: number;
    questionId?: number;
    userId?: number;
  };

  type CommentVO = {
    ancestorId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    parentId?: number;
    questionId?: number;
    repliedUser?: UserVO;
    replies?: CommentVO[];
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type ExchangeRequest = {
    code?: string;
  };

  type getCommentByQuestionIdUsingGETParams = {
    /** questionId */
    questionId?: number;
  };

  type getCommentVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getisCollectUsingGETParams = {
    /** questionId */
    questionId?: number;
  };

  type getMarkUsingGETParams = {
    /** questionId */
    questionId?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getQuestionBankQuestionVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getQuestionBankVOByIdUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    needQueryQuestionList?: boolean;
    notId?: number;
    pageSize?: number;
    picture?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: number;
  };

  type getQuestionFavourStatictUsingGETParams = {
    /** num */
    num?: number;
  };

  type getQuestionMarkVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getQuestionViewNumStatictUsingGETParams = {
    /** num */
    num?: number;
  };

  type getQuestionVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getRedeemVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserSignInRecordUsingGETParams = {
    /** year */
    year?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type HotTagsVO = {
    hotNum?: number;
    tag?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    likeShowAnswer?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MyCommentVO = {
    content?: string;
    id?: number;
    questionId?: number;
    questionNum?: number;
    questionTitle?: string;
    updateTime?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageComment_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Comment[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Question[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionBank_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionBank[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionBankQuestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionBankQuestion[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionBankQuestionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionBankQuestionVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionBankVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionBankVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionMark_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionMark[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionMarkVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionMarkVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRedeem_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Redeem[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRedeemVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RedeemVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type Question = {
    answer?: string;
    content?: string;
    createTime?: string;
    diffity?: string;
    editTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    isVip?: number;
    questionNum?: number;
    tags?: string;
    title?: string;
    updateTime?: string;
    userId?: number;
    viewNum?: number;
  };

  type QuestionAddRequest = {
    answer?: string;
    content?: string;
    diffity?: string;
    isVip?: number;
    tags?: string[];
    title?: string;
  };

  type QuestionBank = {
    createTime?: string;
    description?: string;
    editTime?: string;
    id?: number;
    isDelete?: number;
    picture?: string;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type QuestionBankAddRequest = {
    description?: string;
    picture?: string;
    title?: string;
  };

  type QuestionBankEditRequest = {
    description?: string;
    id?: number;
    picture?: string;
    title?: string;
  };

  type QuestionBankQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    needQueryQuestionList?: boolean;
    notId?: number;
    pageSize?: number;
    picture?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: number;
  };

  type QuestionBankQuestion = {
    createTime?: string;
    id?: number;
    questionBankId?: number;
    questionId?: number;
    updateTime?: string;
    userId?: number;
  };

  type QuestionBankQuestionAddRequest = {
    questionBankId?: number;
    questionId?: number;
  };

  type QuestionBankQuestionBatchAddRequest = {
    questionBankId?: number;
    questionIdList?: number[];
  };

  type QuestionBankQuestionBatchRemoveRequest = {
    questionBankId?: number;
    questionIdList?: number[];
  };

  type QuestionBankQuestionQueryRequest = {
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    questionBankId?: number;
    questionId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type QuestionBankQuestionRemoveRequest = {
    questionBankId?: number;
    questionId?: number;
  };

  type QuestionBankQuestionUpdateRequest = {
    id?: number;
    questionBankId?: number;
    questionId?: number;
  };

  type QuestionBankQuestionVO = {
    createTime?: string;
    id?: number;
    questionBankId?: number;
    questionId?: number;
    tagList?: string[];
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type QuestionBankUpdateRequest = {
    description?: string;
    id?: number;
    picture?: string;
    title?: string;
  };

  type QuestionBankVO = {
    createTime?: string;
    description?: string;
    id?: number;
    picture?: string;
    questionPage?: PageQuestionVO_;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type QuestionBatchDeleteRequest = {
    questionIdList?: number[];
  };

  type QuestionEditRequest = {
    answer?: string;
    content?: string;
    diffity?: string;
    id?: number;
    isVip?: number;
    tags?: string[];
    title?: string;
  };

  type QuestionFavourAddRequest = {
    questionId?: number;
  };

  type QuestionFavourCountDTO = {
    favourNum?: string;
    question?: string;
  };

  type QuestionFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    questionQueryRequest?: QuestionQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type QuestionMark = {
    createTime?: string;
    id?: number;
    markType?: string;
    questionId?: number;
    updateTime?: string;
    userId?: number;
  };

  type QuestionMarkAddRequest = {
    markType?: string;
    questionId?: number;
  };

  type QuestionMarkEditRequest = {
    id?: number;
    markType?: string;
    questionId?: number;
  };

  type QuestionMarkQueryRequest = {
    current?: number;
    id?: number;
    markType?: string;
    pageSize?: number;
    questionId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type QuestionMarkUpdateRequest = {
    id?: number;
    markType?: string;
    questionId?: number;
    userId?: number;
  };

  type QuestionMarkVO = {
    id?: number;
    markType?: string;
    questionId?: number;
    userId?: number;
  };

  type QuestionQueryRequest = {
    answer?: string;
    content?: string;
    current?: number;
    diffity?: string;
    favourNum?: number;
    id?: number;
    isVip?: number;
    notId?: number;
    pageSize?: number;
    questionBankId?: number;
    questionNum?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
    viewNum?: number;
  };

  type QuestionRelatedRequest = {
    id?: number;
    num?: number;
  };

  type QuestionUpdateRequest = {
    answer?: string;
    content?: string;
    diffity?: string;
    id?: number;
    isVip?: number;
    tags?: string[];
    title?: string;
  };

  type QuestionViewCountDTO = {
    question?: string;
    viewNum?: string;
  };

  type QuestionVO = {
    answer?: string;
    content?: string;
    createTime?: string;
    diffity?: string;
    favourNum?: number;
    id?: number;
    isVip?: number;
    questionNum?: number;
    tagList?: string[];
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    viewNum?: number;
  };

  type Redeem = {
    code?: string;
    createTime?: string;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    isUsed?: number;
    updateTime?: string;
    useTime?: string;
    userId?: number;
  };

  type RedeemAddRequest = {
    code?: string;
    expirationTime?: string;
    isUsed?: number;
    useTime?: string;
    userId?: number;
  };

  type RedeemEditRequest = {
    code?: string;
    expirationTime?: string;
    id?: number;
    isUsed?: number;
    useTime?: string;
    userId?: number;
  };

  type RedeemQueryRequest = {
    code?: string;
    current?: number;
    expirationTime?: string;
    id?: number;
    isUsed?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    useTime?: string;
    userId?: number;
  };

  type RedeemUpdateRequest = {
    code?: string;
    expirationTime?: string;
    id?: number;
    isUsed?: number;
    useTime?: string;
    userId?: number;
  };

  type RedeemVO = {
    code?: string;
    createTime?: string;
    expirationTime?: string;
    id?: number;
    isUsed?: number;
    updateTime?: string;
    useTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    editTime?: string;
    id?: number;
    isDelete?: number;
    likeShowAnswer?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    likeShowAnswer?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserBanRequest = {
    banTime?: number;
    userId?: number;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type userUnBanUsingPOSTParams = {
    /** userId */
    userId?: number;
  };

  type UserUpdateMyRequest = {
    likeShowAnswer?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    likeShowAnswer?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
