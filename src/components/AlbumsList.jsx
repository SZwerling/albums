import { useFetchAlbumsQuery } from "../store/apis/albumsApi";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
    const {data, error, isLoading} = useFetchAlbumsQuery(user);
    let content;
    if(isLoading){
        content = <Skeleton times={3}/>
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
            <div>
                {content}
            </div>
        </div>
    )
}

export default AlbumsList;