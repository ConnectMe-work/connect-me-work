# connect-me-work
## Intelligent workforce management, powered by AI

A modern, AI-driven workforce and shift management platform that replaces manual planning, messaging apps, and paper workflows with a branded mobile app and self-service portal.

### Overview
ConnectMe streamlines employee availability, task assignment, attendance confirmation (with geolocation), incident reporting, and supervisor communications. For managers, it automates shift allocation, replacement searches, workload planning, and skill-based matching—finding suitable workers instantly when someone requests leave, misses a shift, or new tasks arise. Documentation, defect reporting, time tracking, and on-site confirmations are consolidated so information reaches the main office in under 30 seconds.

Companies can deploy a fully branded portal in one day, and mobile apps are prepared for App Store and Play Store submission quickly.

### Key features
- Branded mobile app and self-service web portal
- AI-driven shift allocation and skill-based matching
- Automated replacement searches and workload planning
- Availability management and shift confirmations with geolocation
- Task assignment, incident reporting, and time tracking
- Consolidated documentation and defect reporting
- Real-time visibility and notifications
- Fast deployment for branded portals and app store readiness

### How it works
1. Employees set availability and receive tasks via the mobile app or portal.
2. The AI engine matches shifts to available staff based on skills, location, and workload.
3. Workers confirm attendance (optionally with geolocation); absences trigger automated replacement workflows.
4. All events (reports, time entries, confirmations) sync to the central system and are made available to managers in near real-time.

### Supported industries
- Security
- Retail
- Construction
- Field services
- Logistics
- Gaming studios and production
- Event management

### Getting started
Clone the repository and follow the instructions:

Backend:
```bash
git clone <repo-url>
cd connect-me-work/backend
# install dependencies and run locally
./gradlew bootRun
```

Frontend:
```bash
cd frontend
# install dependencies
npm install
# run locally
npm start
```

Mobile:
```bash
cd mobile
# install dependencies
npm install
# run application in emulator
npx react-native run-android
# run application in usb-connected device ( with id 'XXX' )
npx react-native run-android --deviceId=XXX
```

### Deployment
- Branded web portal: deployable within a day with proper brand assets.
- Mobile apps: prepared for App Store and Play Store submission — follow the mobile build guide in docs/ for signing and packaging steps.
- Integrations: supports common time-tracking, HR, and payroll systems (configure via the integrations settings).

# License
For details on the MIT License, please refer to the `LICENSE` file in this repository. The MIT License allows users to use, copy, modify, and distribute the software with minimal restrictions, providing it "as is" without warranties.