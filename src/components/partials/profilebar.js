/* import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { getAuth } from 'firebase/auth';

function Profilebar () {
	const [username, setUsername] = useState("");
	const [url, setUrl] = useState("");


	useEffect(() => {
		setUsername(auth?.currentUser?.displayName);
		setUrl(auth?.currentUser?.photoURL);
	
	})
	
	return (
		<div>
			<div className="d-flex flex-row justify-content-between px-2">
				<p className="name fw-bold">
					{username}
				</p>
				<img className='rounded-circle profileImg' src={url} alt="" />
			</div>
		</div>
	);
}

export default Profilebar;
 */