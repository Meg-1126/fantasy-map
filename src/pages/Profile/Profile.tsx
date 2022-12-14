import { Grid, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppTemplate from "../../templates/AppTemplate";
import BioSection from "./BioSection";
import UsersFavorite from "./UsersFavorite";
import UsersListSection from "./UsersListSection";
import UsersReview from "./UsersReview";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Review } from "../../../typings";
import { FavoritePlace } from "../../../typings";
import { ListCard } from "../../../typings";

const Profile: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { sendRequest, isLoading } = useHttpRequest();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favorites, setFavorites] = useState<FavoritePlace[]>([]);
  const [lists, setLists] = useState<ListCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (state.loggedUser?.id) {
        const dbUser = await sendRequest("/api/users/profile", "GET");
        const profileData = {
          name: dbUser.name,
          email: dbUser.email,
          password: dbUser.password,
          profilePicture: dbUser.profilePicture,
          location: dbUser.location,
          description: dbUser.description,
        };
        dispatch({
          type: "setProfileData",
          payload: profileData,
        });
        setFavorites(dbUser.favoritePlaces);
        setReviews(dbUser.reviews);
        setLists(dbUser.lists);
      } else {
        navigate("/login");
      }
    })();
  }, [state.loggedUser]);

  return (
    <AppTemplate>
      <>{isLoading && <LoadingSpinner loading={isLoading} />}</>
      <Box
        sx={{
          backgroundColor: "#F9F6F0",
          paddingTop: "10rem",
          paddingBottom: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12}>
              <BioSection />
            </Grid>
            <Grid item xs={12}>
              <UsersListSection lists={lists} />
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={5} sx={{ my: 4 }}>
                <UsersFavorite favorites={favorites} />
                <UsersReview reviews={reviews} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppTemplate>
  );
};

export default Profile;
