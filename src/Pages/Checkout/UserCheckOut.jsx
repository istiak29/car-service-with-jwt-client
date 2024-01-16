import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import CheckOutTable from "./CheckOutTable";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserCheckOut = () => {

    const { user } = useContext(AuthContext);

    const [checkOuts, setCheckOuts] = useState([]);

    const axiosSecure = useAxiosSecure()

    // const url = `https://car-service-jwt-server.vercel.app/checkouts?email=${user?.email}`
    const url = `/checkouts?email=${user?.email}`

    useEffect(() => {
        // axios.get(url, { withCredentials: true })
        //     .then(result => {
        //         console.log('user checkouts: ',result.data);
        //         setCheckOuts(result.data);
        //     })
        //     .catch(error => console.error(error));

        // from custom hook
        axiosSecure.get(url)
        .then(res => setCheckOuts(res.data))

    }, [url, axiosSecure]);


    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://car-service-jwt-server.vercel.app/checkouts/${id}`, )
                    .then(result => {
                        console.log(result.data)
                        
                        if (result.data.deletedCount > 0) {
                            
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const remainings = checkOuts.filter(remaining => remaining._id !== id);
                            setCheckOuts(remainings)
                        }
                    })
                    .catch(error => console.error(error));

                
            }
        });
    }


    const handleConfirm = id => {

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axios.patch(`https://car-service-jwt-server.vercel.app/checkouts/${id}`, { status: "Approved"})
                    .then(result => {
                        console.log(result.data)

                        if (result.data.modifiedCount > 0) { 
                            Swal.fire("Saved!", "", "success");

                            const remaining = checkOuts.filter(checkOut => checkOut._id !== id);

                            const updated = checkOuts.find(checkOut => checkOut._id === id);

                            updated.status = 'Approved';

                            const updatedCheckOuts = [updated, ...remaining];

                            setCheckOuts(updatedCheckOuts);


                        }
                    })
                    .catch(error => console.error(error));

                
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });


        
    }
    

    return (
        <div>
            <h2 className="font-bold text-3xl">You have: {checkOuts.length} services.</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>


                    {
                        checkOuts.map(checkOut =>
                            <CheckOutTable
                                key={checkOut._id}
                                checkOut={checkOut}
                                handleDelete={handleDelete}
                                handleConfirm={handleConfirm}
                            ></CheckOutTable>
                        )
                    }

                </table>
            </div>
        </div>
    );
};

export default UserCheckOut;