import React, { useEffect, useState } from 'react'
import './eventdetails.css'
import { eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import EventDetailSection from './EventDetailSection';
import { useAtom } from 'jotai';
import TeamCard from './TeamCard';
import backendService from '../../../services/backendService'
import { RxCross2 } from "react-icons/rx";
import Leaderboard from './Leaderboard';


export default function EventOrganizerDetails() {
    const [showTeams, setShowTeams] = useState(false);
    const [teamDetailsList, setTeamDetailsList] = useState(null);
    const [eventOrganizerDetails, setEventOrganizerDetails] = useAtom(eventOrganizerDetailsAtom);
    const [eventId, setEventId] = useState(null);

    const handleShowTeamsClick = () => {
        setShowTeams(!showTeams);
    }

    const getTeamsWithCount = async () => {
        const response = await backendService.getEventId('PUBG-EVENT');
        // ESA-058:change event id to response
        setEventId(1);
        const teamDetailsResponse = await backendService.getTeamsWithCount(response, eventOrganizerDetails.name);
        // ESA-058: Uncomment below code
        // setTeamDetailsList(teamDetailsResponse);
        setTeamDetailsList([
            {
                teamName: "TEAM-ONE",
                remainingPlayers: 2
            },
            {
                teamName: "TEAM-TWO",
                remainingPlayers: 0
            },
            {
                teamName: "TEAM-THREE",
                remainingPlayers: 1
            }
        ])
    }

    const closeEventOrganizerDetails = () => {
        setEventOrganizerDetails(null);
    }

    const generateExcel = async () => {
        await backendService.generateExcel(1);
    }

    useEffect(() => {
        getTeamsWithCount();
    }, []);
    return (
        <>
            {
                eventOrganizerDetails && <div className='event-content-scrollable'>
                    <EventDetailSection eventDetails={eventOrganizerDetails} />
                    {eventOrganizerDetails.status === 'INACTIVE' &&
                        <div className="confirm-message-space">
                            Event is in pending and waiting for admin confirmation
                        </div>
                    }
                    {eventOrganizerDetails.status === 'ACTIVE' && (
                        !showTeams ?
                            <button type="button" className='btn btn-outline-light button_team' onClick={handleShowTeamsClick}>
                                SHOW TEAMS
                            </button>
                            :
                            <div className='join-team-container form-box-create-event'>
                                <div className="close-icon-container">
                                    <RxCross2 size={30} color="grey" onClick={handleShowTeamsClick} />
                                </div>
                                <h1>Teams</h1>
                                {
                                    teamDetailsList && teamDetailsList.map((teamDetails) => (
                                        <TeamCard teamName={teamDetails.teamName} count={teamDetails.remainingPlayers} type={eventOrganizerDetails.type} />
                                    ))
                                }
                            </div>)
                    }
                    {/* add button for generate excel which calls the backend API */}
                    {(eventOrganizerDetails.status === 'ONGOING' || eventOrganizerDetails.status === 'COMPLETED') &&
                        <button type="button" className='btn btn-outline-light button_team' onClick={generateExcel}>
                            Generate Sheet
                        </button>
                    }
                    {
                        eventOrganizerDetails.status === 'COMPLETED' && <div>
                            {/* Leaderboard Component : props - eventId*/}
                            <Leaderboard eventId={eventId} />
                        </div>
                    }
                    <button type="button" className='btn btn-outline-light button_team' onClick={closeEventOrganizerDetails}>
                        Close
                    </button>
                </div>
            }

        </>
    )
}
