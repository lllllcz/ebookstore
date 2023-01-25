import {useNavigate} from "react-router";
import {Card} from "antd";
import priceFormat from "../utils/priceFormat";
const { Meta } = Card;

function BookCard(props) {
  const book = props.book;
  let id = 0;
  let element = <p>empty</p>;
  if (book != null) {
    id = book.bookId;
    element = <Meta title={book.bookName} description={"￥ "+priceFormat(book.bookPrice)} />
  }

  const Navigate = useNavigate()
  function handleClick() {
    const path = "/book?id=" + id;
    Navigate(path)
  }

  return (
    <Card
      hoverable
      style={{
        width: 250,
        margin: "0 auto",
      }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
      onClick={handleClick}
    >
      {element}
    </Card>
  );
}
export default BookCard;