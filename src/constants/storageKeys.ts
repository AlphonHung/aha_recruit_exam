export const StorageKeys = {
    System: {
        Locale: 'SYSTEM/LOCALE', // 目前語言
        AppOpenCount: 'SYSTEM/APP_OPEN_COUNT', // App使用次數
        CommentDialogShown: 'SYSTEM/COMMENT_DIALOG_SHOWN', // 已顯示過評論
        HasTutorial: 'SYSTEM/HAS_TUTORIAL', // 已顯示過教學
        RecentRewardAdTime: 'SYSTEM/RECENT_REWARD_AD_TIME', // 近期看廣告的時間
        AppUseCount: 'SYSTEM/APP_USE_COUNT', // 使用次數(用來決定是否顯示評論)
        PageIntroVisited: 'SYSTEM/PAGE_INTRO_VISITED', // 指定頁面是否已檢視過
        ServiceConfig: 'SYSTEM/SERVICE_CONFIG', // 後端config
        PromoteAppList: 'SYSTEM/PROMOTE_APP_LIST', // 已推薦過的app
        PromoteAppTime: 'SYSTEM/PROMOTE_APP_TIME' // 上次推薦app的時間
    },
    Sign: {
        MeritPoint: 'SIGN/MERIT_POINT', // 功德點數
    },
    Stock: {
        LatestStock: 'STOCK/LATEST_STOCK', // 最近查找的股票結果
        HistorySearch: 'STOCK/HISTORY_SEARCH', // 歷史查詢記錄
        StockList: 'STOCK/STOCK_LIST', // 股票清單
        FavoriteList: 'STOCK/FAVORITE_LIST', // 最愛股票代號清單
        DividendList: 'STOCK/DIVIDEND_LIST', // 曾找過的股票股利
    }
}