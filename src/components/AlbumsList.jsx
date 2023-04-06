import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store/apis/albumsApi";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
    const {data, error, isLoading} = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    
    const handleAddAlbum = () => {
        addAlbum(user)
    }
    
    let content;
    if(isLoading){
        content = <Skeleton size={"h-10 w-full"} times={3}/>
    } else if(error){
        content = <div>Error Loading Albums</div>
    } else {
        content = data.map((album => {
            const header = <div>{album.title}</div>
            return <ExpandablePanel header={header} key={album.id}>
                List of Photos in the Album
            </ExpandablePanel>
        })) 
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    )
}

export default AlbumsList;