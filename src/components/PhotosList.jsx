import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from './PhotosListItem';

function PhotosList ({ album }) {
    const {data, error, isFetching} = useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();
    
    const handleAddPhoto = () => {
        addPhoto(album);
    }

    let content;

    if(isFetching){
        content = <Skeleton size={"h-8 w-8"} times={4}/>
    } else if(error){
        content = <div>Error Loading Photos</div>
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo}/>
        })
    }


    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">photos in {album.title}</h3>
            <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>+ add photo</Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
    </div>
}

export default PhotosList;