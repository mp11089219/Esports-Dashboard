import React, { useState } from 'react'
import { useAtomValue, useAtom } from 'jotai';
import { eventDetailsAtom, eventDetailsAtomCopy, eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import { USERS, useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import EventDetailSection from '../Event/EventDetailSection';
import LeaderboardTable from './LeaderboardTable';
import backendService from '../../../services/backendService';

export default function LeaderboardEventDetails() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let eventDetailsAtomResult;
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        eventDetailsAtomResult = eventDetailsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        eventDetailsAtomResult = eventDetailsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const eventDetails = useAtomValue(eventDetailsAtomResult);
    const [eventOrganizerDetails, setEventOrganizerDetails] = useAtom(eventOrganizerDetailsAtom);
    const loggedInUser = useAtomValue(loggedInUserAtomResult);
    const [eventId, setEventId] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);

    const getEventId = async () => {
        // ESA-058: change the team name to get from eventDetails atom
        const response = await backendService.getEventId('PUBG-EVENT');
        setEventId(response);
        return response;
    }

    const fetchLeaderboardData = async () => {
        // ESA-058: uncomment below code
        const id = await getEventId();
        const response = await backendService.getLeaderboard(id, email);
        // ESA-058: uncomment below code
        // setLeaderboard(response);
    }

    useEffect(() => {
        if (loggedInUser.userType === USERS.PARTICIPANT)
            fetchLeaderboardData();
        else getEventId();
    }, []);

    return (
        <div className='scrollable-container'>
            {
                loggedInUser.userType === USERS.PARTICIPANT && <>
                    <EventDetailSection eventDetails={eventDetails} />
                    {
                        leaderboard && leaderboard.message === 'Congratulations' ?
                            <p>Hurray, you have won the event</p>
                            :
                            <p>Better luck next time</p>
                    }
                    {
                        eventId && <LeaderboardTable eventId={eventId} />
                    }
                </>
            }
            {
                loggedInUser.userType === USERS.ORGANIZER && <>
                    <EventDetailSection eventDetails={eventOrganizerDetails} />
                    {
                        eventId && <LeaderboardTable eventId={eventId} />
                    }

                </>
            }
        </div>
    )
}
