public/
┣ images/
┃ ┗ (assets públicos)
┣ favicon.ico
┣ logo192.png
┣ logo512.png
┣ manifest.json
┗ robots.txt


src/
┣ api/
┃ ┗ sigeaHooks.jsx
┃
┣ app/
┃ ┣ App.jsx
┃ ┣ AppRouter.jsx
┃ ┗ routes.js
┃
┣ assets/
┃ ┗ .gitkeep
┃
┣ components/
┃ ┣ common/
┃ ┃ ┣ EventsCards.jsx
┃ ┃ ┣ EventsCards.module.css
┃ ┃ ┣ Footer.jsx
┃ ┃ ┣ footer.module.css
┃ ┃ ┣ Header.jsx
┃ ┃ ┣ header.module.css
┃ ┃ ┗ LoadingScreen.jsx
┃ ┣ forms/
┃ ┃ ┗ .gitkeep
┃ ┗ ui/
┃ ┃ ┣ Alert.jsx
┃ ┃ ┣ FileUpload.jsx
┃ ┃ ┣ fileUpload.module.css
┃ ┃ ┣ index.js
┃ ┃ ┗ PhoneInput.jsx
┃
┣ config/
┃ ┗ api.config.js
┃
┣ desingSystem/
┃ ┣ primitives/
┃ ┃ ┣ avatar/
┃ ┃ ┃ ┣ avatar.jsx
┃ ┃ ┃ ┗ index.js
┃ ┃ ┣ badge/
┃ ┃ ┃ ┣ badge.jsx
┃ ┃ ┃ ┗ index.js
┃ ┃ ┣ button/
┃ ┃ ┃ ┣ button.jsx
┃ ┃ ┃ ┗ index.js
┃ ┃ ┣ card/
┃ ┃ ┃ ┣ card.jsx
┃ ┃ ┃ ┗ index.js
┃ ┃ ┣ divider/
┃ ┃ ┃ ┣ divider.jsx
┃ ┃ ┃ ┗ index.js
┃ ┃ ┣ icon/
┃ ┃ ┃ ┣ icon.jsx
┃ ┃ ┃ ┗ index.js
┃ ┃ ┣ input/
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┗ input.jsx
┃ ┃ ┣ skeleton/
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┗ skeleton.jsx
┃ ┃ ┣ spinner/
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┗ spinner.jsx
┃ ┃ ┣ typography/
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┗ typography.jsx
┃ ┃ ┗ index.js
┃ ┗ tokens/
┃ ┃ ┣ breakpoints.js
┃ ┃ ┣ colors.js
┃ ┃ ┣ index.js
┃ ┃ ┣ shadows.js
┃ ┃ ┣ spacing.js
┃ ┃ ┣ test.js
┃ ┃ ┗ typography.js
┃
┣ docker/
┃ ┗ ngnix.conf
┃
┣ features/
┃ ┣ activities/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ ActivityForm/
┃ ┃ ┃ ┃ ┣ ActivityForm.jsx
┃ ┃ ┃ ┃ ┣ activityForm.module.css
┃ ┃ ┃ ┃ ┣ BasicInfo.jsx
┃ ┃ ┃ ┃ ┣ ContentMaterials.jsx
┃ ┃ ┃ ┃ ┗ OrganizationDetails.jsx
┃ ┃ ┃ ┣ ReportsModal/
┃ ┃ ┃ ┃ ┣ ReportsDocumentation.jsx
┃ ┃ ┃ ┃ ┗ reportsDocumentation.module.css
┃ ┃ ┃ ┣ ActivityFilters.jsx
┃ ┃ ┃ ┣ activityFilters.module.css
┃ ┃ ┃ ┣ ActivityList.jsx
┃ ┃ ┃ ┣ ActivityManager.jsx
┃ ┃ ┃ ┗ activityManager.module.css
┃ ┃ ┣ hooks/
┃ ┃ ┃ ┣ useActivities.js
┃ ┃ ┃ ┣ useActivityForm.js
┃ ┃ ┃ ┗ useActivityManager.js
┃
┃ ┣ admin/
┃ ┃ ┣ hooks/
┃ ┃ ┃ ┗ useAdminDashboard.js
┃ ┃ ┗ services/
┃ ┃ ┃ ┗ adminService.js
┃
┃ ┣ auth/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ PasswordRecovery/
┃ ┃ ┃ ┃ ┣ index.jsx
┃ ┃ ┃ ┃ ┣ passwordRecovery.module.css
┃ ┃ ┃ ┃ ┣ StepCODE.jsx
┃ ┃ ┃ ┃ ┣ StepDNI.jsx
┃ ┃ ┃ ┃ ┗ StepNewPassword.jsx
┃ ┃ ┃ ┣ authForms.module.css
┃ ┃ ┃ ┣ AuthLayout.jsx
┃ ┃ ┃ ┣ authLayout.module.css
┃ ┃ ┃ ┣ LoginForm.jsx
┃ ┃ ┃ ┗ RegisterForm.jsx
┃ ┃ ┗ hooks/
┃ ┃ ┃ ┣ useAuth.jsx
┃ ┃ ┃ ┗ useAuthForm.jsx
┃
┃ ┣ certificates/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ CertificateList.jsx
┃ ┃ ┃ ┣ CertificateManager.jsx
┃ ┃ ┃ ┣ certificateManager.module.css
┃ ┃ ┃ ┗ IssuanceStats.jsx
┃ ┃ ┗ hooks/
┃ ┃ ┃ ┗ useCertificates.js
┃
┃ ┣ dashboard/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ DashboardHome.jsx
┃ ┃ ┃ ┣ dashboardHome.module.css
┃ ┃ ┃ ┣ DashboardLayout.jsx
┃ ┃ ┃ ┣ dashboardLayout.module.css
┃ ┃ ┃ ┣ Sidebar.jsx
┃ ┃ ┃ ┗ sidebar.module.css
┃ ┃ ┗ config/
┃ ┃ ┃ ┣ organizerDashboardConfig.js
┃ ┃ ┃ ┗ participantDashboardConfig.js
┃
┃ ┣ landing/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ aboutSection.jsx
┃ ┃ ┃ ┣ aboutSection.module.css
┃ ┃ ┃ ┣ certificationsSection.jsx
┃ ┃ ┃ ┣ certificationsSection.module.css
┃ ┃ ┃ ┣ heroSection.jsx
┃ ┃ ┃ ┣ heroSection.module.css
┃ ┃ ┃ ┣ nextEventSection.jsx
┃ ┃ ┃ ┣ nextEventSection.module.css
┃ ┃ ┃ ┣ programsSection.jsx
┃ ┃ ┃ ┣ programsSection.module.css
┃ ┃ ┃ ┣ reviewsSection.jsx
┃ ┃ ┃ ┗ reviewsSection.module.css
┃ ┃ ┣ hooks/
┃ ┃ ┃ ┗ useLanding.js
┃ ┃ ┗ services/
┃ ┃ ┃ ┣ landingService.js
┃ ┃ ┃ ┗ nota.txt
┃
┃ ┣ participantsDashboard/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ EnrollmentForm.jsx
┃ ┃ ┃ ┣ EventosDisponibles.jsx
┃ ┃ ┃ ┣ MisCertificados.jsx
┃ ┃ ┃ ┣ MisInscripciones.jsx
┃ ┃ ┃ ┣ ParticipantInicio.jsx
┃ ┃ ┃ ┗ PaymentUI.jsx
┃ ┃ ┣ hooks/
┃ ┃ ┃ ┗ useParticipantDashboard.jsx
┃ ┃ ┗ index.js
┃
┃ ┗ participantsmanagement/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ PaymentVerification/
┃ ┃ ┃ ┃ ┣ paymentVerification.module.css
┃ ┃ ┃ ┃ ┗ PaymentVerificationModal.jsx
┃ ┃ ┃ ┣ ActivitySelector.jsx
┃ ┃ ┃ ┣ AttendanceStats.jsx
┃ ┃ ┃ ┣ ParticipantList.jsx
┃ ┃ ┃ ┣ ParticipantManager.jsx
┃ ┃ ┃ ┗ participantManager.module.css
┃ ┃ ┗ hooks/
┃ ┃ ┃ ┗ useParticipantManager.js
┃
┣ hooks/
┃ ┗ useScrollSpy.js
┃
┣ pages/
┃ ┣ dashboard/
┃ ┃ ┗ .gitkeep
┃ ┣ home/
┃ ┃ ┗ .gitkeep
┃ ┣ AdminDashboard.jsx
┃ ┣ Auth.jsx
┃ ┣ DesignSystemTest.jsx
┃ ┣ EventsPage.jsx
┃ ┣ LandingPage.jsx
┃ ┣ OrganizerActivity.jsx
┃ ┣ ParticipantDashboard.jsx
┃ ┗ ValidationPage.jsx
┃
┣ services/
┃ ┣ activityService.js
┃ ┣ authService.js
┃ ┣ axiosConfig.js
┃ ┣ eventsService.js
┃ ┣ mockAuthService.js
┃ ┗ participantService.js
┃
┣ styles/
┃ ┣ eventsPage.module.css
┃ ┗ index.css
┃
┣ utils/
┃ ┣ apiHelpers.js
┃ ┣ constants.js
┃ ┣ errorHandler.js
┃ ┣ themeHelpers.js
┃ ┗ tokenHelper.js
┃
┗ index.jsx
