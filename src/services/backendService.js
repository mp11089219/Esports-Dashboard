const backendService = {
    async saveCredentials(credentials) {
        try {
            const result = await fetch('http://localhost:8086/identity/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving credential data", error);
        }
    },

    async sendVerificationEmail(emailRequest) {
        try {
            const result = await fetch('http://localhost:8086/email/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailRequest)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error whilesending verification email", error);
        }
    },

    async validateCredentials(credentials) {
        try {
            const result = await fetch('http://localhost:8086/identity/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while validating credential data", error);
        }
    },

    async getCommentsData(commentObject) {
        try {
            const result = await fetch('http://localhost:8086/comments/save-comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentObject)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while posting Comments data", error);
        }
    },

    async saveProfile(profile) {
        try {
            const result = await fetch('http://localhost:8086/profile/save-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving profile data", error);
        }
    },

    async getActiveGamesData() {
        try {
            const result = await fetch('http://localhost:8086/games/get-active-games');

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting active games", error);
        }
    },

    async isProfileComplete(email) {
        try {
            const url = 'http://localhost:8086/profile/is-profile-complete/' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while checking profile completion", error);
        }
    },

    async getActiveEventsWrtInterestedGamesData(email) {
        try {
            const url = 'http://localhost:8086/events/get-upcoming-events-interested-games/' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting active events with respect to interested games", error);
        }
    },

    async getEventDetails(eventName) {
        try {
            const url = 'http://localhost:8086/events/get-event/' + eventName;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting event details with name", error);
        }
    },

    async getEventId(eventName) {
        try {
            const url = 'http://localhost:8086/events/get-event-id/' + eventName;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting event id with name", error);
        }
    },

    async saveTeam(team) {
        try {
            const result = await fetch('http://localhost:8086/events/save-team?isCreate=true&isUpdate=false', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving credential data", error);
        }
    },

    async isRegistered(eventId, eventName, email) {
        try {
            const url = 'http://localhost:8086/events/is-registered?eventId=' + eventId + '&eventName=' + eventName + '&email=' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting isRegistered", error);
        }
    },
}

export default backendService;