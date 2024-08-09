import React from 'react'
import PrivateRoute from '../../features/protectedRoutes/PrivateRoute';
import CandidateProfilePage from '../../pages/company/CandidateProfile';

const privateRoutes = [
    {path:"company",
      children:[
        {path:"candidateInfo/:id",
          element: <PrivateRoute element={CandidateProfilePage} />,

        }
      ]
    }
  ];
  
  export default privateRoutes;