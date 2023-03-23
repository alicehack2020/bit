import PaymentForm from 'PaymentForm/PaymentForm ';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions,cardActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    //  const { users } = useSelector(x => x.users);
    // const users=JSON.parse(localStorage.getItem('user'))
    const users = {
        id: 1,
        firstName: 'demo',
        lastName:'demo' 
    }
    useEffect(() => {
        // dispatch(userActions.getAll());
        dispatch(cardActions.getAllCard());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {authUser?.firstName}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {users.length &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
            }

            <div>
                <PaymentForm/>
            </div>





            
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>

    );
}
