import { useAuth0 } from "@auth0/auth0-react"
import Container from '@mui/material/Container';
import './Dashboard.scss'

import React from 'react'
import LeftSide from "./BothSide/LeftSide";
import RightSide from "./BothSide/RightSide";

const Dashboard = () => {
    const { logout, isAuthenticated } = useAuth0()
    return (
        isAuthenticated && (
            // <button onClick={() => logout()}>
            //     Sign Out
            // </button>
            <div style={{ display: 'flex' }}>
                <div className="cot1">
                    <Container maxWidth="xl">
                        <div className="cotContent">
                            <LeftSide logout={logout} />
                        </div>
                    </Container>
                </div>
                <div className="cot2">
                    <Container maxWidth="lg">
                        <div className="cotContent">
                            <RightSide />
                        </div>
                    </Container>
                </div>
            </div>

        )
    )
}

export default Dashboard
