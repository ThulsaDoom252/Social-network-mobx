import React, {useEffect} from 'react';
import Header from "./components/Header";
import Info from "./components/Info/Info";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfileContainer";
import MobileNavbar from "./components/MobileNavbar";
import {
    authRoute,
    friendsRoute,
    infoRoute,
    rootRoute,
    usersRoute,
} from "./common";
import EditProfileModal from "./components/Profile/EditProfileModal";
import authStore from "./mobx/auth";
import profileStore from "./mobx/profile";
import appStore from "./mobx/app";
import {observer} from "mobx-react-lite";
import AuthContainer from "./components/Auth/AuthContainer";
import {initializeCurrentUser} from "./mobx/initializeCurrentUser";
import UsersContainer from "./components/Users/UsersContainer";
import Initialize from "./components/initialize";
import StatusModal from "./components/Profile/StatusModal";
import FriendsPageContainer from "./components/Friends/FriendsPageContainer";
import {useSnackbar} from "notistack";

const App: React.FC = observer(() => {
    // Snackbar notifications
    const {enqueueSnackbar} = useSnackbar();

    // Current page path
    const currentPath = appStore.currentPath;

    // Authentication state
    const isLogged = authStore.isLogged;
    const isLoggedOutByUser = authStore.isLoggedOutByUser;

    // Current user info
    const currentUserEmail = authStore.email;
    const currentUserId = authStore.id;
    const currentUserName = profileStore.currentUserProfileData?.fullName;
    const currentUserAvatar = profileStore.currentUserProfileData?.photos?.large;
    const viewedUserId = profileStore.viewedUserId || currentUserId;

    // Loading current user data
    const isCurrentUserDataLoaded = profileStore.isCurrentUserDataLoaded;
    const currentUserProfileData = profileStore.currentUserProfileData;

    // Loading user data
    const isProfileDataLoaded = profileStore.isProfileDataLoaded;
    const profileData = profileStore.profileData;
    const currentUserStatus = profileStore.status;

    // Is current user profile
    const isCurrentUserProfile = profileStore.isCurrentUserProfile;

    // User data update states
    const isAvatarUpdating = profileStore.isAvatarUpdating;
    const isUserDataUpdating = profileStore.isUserDataUpdating;

    // Errors and success messages
    const apiError = appStore.apiError;
    const successMessage = appStore.successMessage;

    // Modal states
    const isEditDataModalOpen = appStore.isEditProfileModalOpen;
    const isStatusModalOpen = profileStore.isStatusModalOpen;

    // Screen sizes
    const smallScreenMode = appStore.smallScreen;
    const tinyScreenMode = appStore.tinyScreen;

    // Initializing current user profile if they are authorized
    useEffect(() => {
        if (!isLoggedOutByUser) {
            initializeCurrentUser().then(() => void 0);
        }
    }, [isLogged]);

    // Toggle snackBar error message depending on apiError value
    useEffect(() => {
        if (apiError) {
            console.error(`Contacts developer for this error - ${apiError}`);
            enqueueSnackbar(`${apiError} . See console for details`, {
                autoHideDuration: 3000,
                variant: 'error',
            });
        }
    }, [apiError]);

    // Toggle snackbar success message depending on successMessage value
    useEffect(() => {
        if (successMessage) {
            enqueueSnackbar(successMessage, {autoHideDuration: 1500});
            appStore.setSuccessMessage(null);
        }
    }, [successMessage]);

    // Subscribing to screen size changes by modifying smallScreenMode/TinyScreenMode variables.
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            appStore.toggleSmallScreen(screenWidth < 1000);
            appStore.toggleTinyScreen(screenWidth < 481);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // проверяем размер экрана при первой загрузке компонента

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Open/close status modal
    const handleOpenStatusModal = () => {
        profileStore.toggleStatusModal(true);
    };
    const handleCloseStatusModal = () => {
        profileStore.toggleStatusModal(false);
    };

    const handleOpenEditModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        appStore.toggleIsEditProfileModalOpen(true);
    };

    // Change current user status
    const handleChangeStatus = (status: string) => {
        profileStore.updateStatus(status).finally(() => void 0);
    };

    // Closing Edit profile modal by clicking on close btn/empty space
    const handleCloseModal = () => {
        isEditDataModalOpen && appStore.toggleIsEditProfileModalOpen(false);
    };
    // Initializing component
    if (!appStore.isInitialized) {
        return <Initialize/>;
    }

    return (
        <BrowserRouter>
            <div
                className={`
              w-screen
        h-screen
        ${!isLogged && 'flex justify-center'}
            `}
                onClick={handleCloseModal}
            >
                {/*///Edit data modal*/}
                {isCurrentUserDataLoaded && (
                    <EditProfileModal
                        isAvatarUpdating={isAvatarUpdating}
                        isUserDataUpdating={isUserDataUpdating}
                        currentUserProfileData={currentUserProfileData}
                        handleCloseModal={handleCloseModal}
                        smallScreen={smallScreenMode}
                        isOpen={isEditDataModalOpen}
                    />
                )}
                <StatusModal
                    visible={isStatusModalOpen}
                    currentUserStatus={currentUserStatus}
                    onClose={handleCloseStatusModal}
                    handleChangeStatus={handleChangeStatus}
                />
                <div
                    className={`
                ${isLogged && `  
                mx-auto
                max-w-container
                bg-blue-200
                min-h-full
               overflow-y-hidden`}
                    `}
                >
                    {/*Header*/}
                    {isLogged && (
                        <Header
                            currentUserId={currentUserId}
                            userId={viewedUserId}
                            handleOpenModal={handleOpenEditModal}
                            smallScreenMode={smallScreenMode}
                            avatar={currentUserAvatar}
                            currentUserName={currentUserName}
                            tinyScreenMode={tinyScreenMode}
                            isCurrentUserDataLoaded={isCurrentUserDataLoaded}
                        />
                    )}
                    <div
                        className={`
                         ${smallScreenMode ? 'p-0' : 'p-1'}
                        `}
                    >
                        <div
                            className={`
                    flex
                    justify-between
                    ${smallScreenMode ? 'flex-col' : 'pt-2'}
                    `}
                        >
                            {isLogged && smallScreenMode && (
                                <div
                                    className={`
                            relative
                            w-full
                            h-12
                            `}
                                >
                                    {/*//SmallScreen navbar */}
                                    {smallScreenMode && !isEditDataModalOpen && (
                                        <MobileNavbar viewedUserId={viewedUserId}/>
                                    )}
                                </div>
                            )}
                            <Routes>
                                <Route
                                    path={rootRoute}
                                    element={<Navigate to={`/profile/${currentUserId}`}/>}
                                />
                                <Route
                                    path={authRoute}
                                    element={
                                        <AuthContainer
                                            isLogged={isLogged}
                                            smallScreenMode={smallScreenMode}
                                            currentUserId={currentUserId}
                                        />
                                    }
                                />
                                <Route
                                    path={`/profile/:useridParam?`}
                                    element={
                                        <ProfilePage
                                            isCurrentUserProfile={isCurrentUserProfile}
                                            handleOpenModal={handleOpenEditModal}
                                            handleOpenStatusModal={handleOpenStatusModal}
                                            tinyScreenMode={tinyScreenMode}
                                            isLogged={isLogged}
                                            isCurrentUserDataLoaded={isCurrentUserDataLoaded}
                                            isProfileDataLoaded={isProfileDataLoaded}
                                            smallScreenMode={smallScreenMode}
                                            profileData={profileData}
                                            currentUserProfileData={currentUserProfileData}
                                            currentUserId={currentUserId}
                                            currentUserEmail={currentUserEmail}
                                            currentUserStatus={currentUserStatus}
                                            viewedUserId={viewedUserId}
                                        />
                                    }
                                />
                                <Route
                                    path={friendsRoute}
                                    element={
                                        <FriendsPageContainer
                                            mobileMode={smallScreenMode}
                                            isLogged={isLogged}
                                            currentPath={currentPath}
                                            tinyScreenMode={tinyScreenMode}
                                        />
                                    }
                                />
                                <Route
                                    path={usersRoute}
                                    element={
                                        <UsersContainer
                                            smallScreenMode={smallScreenMode}
                                            tinyScreenMode={tinyScreenMode}
                                            currentPath={currentPath}
                                            isLogged={isLogged}
                                        />
                                    }
                                />
                                <Route path={infoRoute}
                                       element={<Info isLogged={isLogged}
                                                      smallScreenMode={smallScreenMode}
                                                      tinyScreenMode={tinyScreenMode}

                                       />}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
});

export default App;
