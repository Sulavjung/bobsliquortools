import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export const addMyObjectToFirestore = async (data) => {
	try {
		const myCollectionRef = collection(firestore, 'register');
		await addDoc(myCollectionRef, data);
		console.log('Object added to Firestore successfully');
	} catch (err){
		console.error(err);
	}
}

export const getMyObjectFromFirestore = async () => {
    try {
        const myCollectionRef = collection(firestore, 'register');
        const querySnapshot = await getDocs(myCollectionRef);

        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });

		console.log(data);

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}