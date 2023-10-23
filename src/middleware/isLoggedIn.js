/* import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../config/firebase";

export async function user() {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
		return {
		  isloggedIn: true,
		  accout: auth.currentUser,
		};
	  } else if (user == null) {
		return redirect("/login");
	  }
  }); 
}
 */