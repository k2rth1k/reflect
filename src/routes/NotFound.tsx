import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const NotFound: React.FC = () => {
    const location = useLocation();

    return (
        <div className="not-found">
            <div className="not-found-content">
                <div className="error-code">404</div>
                <h1>Page Not Found</h1>
                <p className="error-message">
                    Sorry, the page <code>{location.pathname}</code> doesn't exist.
                </p>

                <div className="error-details">
                    <p>It looks like you've hit a route that doesn't exist. Here are some helpful links:</p>
                </div>

                <div className="action-buttons">
                    <Link to="/home" className="btn btn-primary">
                        🏠 Go Home
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary">
                        📊 Dashboard
                    </Link>
                    <Link to="/analytics" className="btn btn-secondary">
                        📈 Analytics
                    </Link>
                </div>

                <div className="suggestions">
                    <h3>Popular Pages:</h3>
                    <ul className="suggestion-list">
                        <li><Link to="/home">Home - Main overview</Link></li>
                        <li><Link to="/dashboard">Dashboard - Workout summary</Link></li>
                        <li><Link to="/analytics">Analytics - Progress tracking</Link></li>
                        <li><Link to="/settings">Settings - App configuration</Link></li>
                    </ul>
                </div>

                <div className="error-illustration">
                    <div className="dumbbell">🏋️‍♂️</div>
                    <p className="illustration-text">
                        Looks like this workout doesn't exist in our routine!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;