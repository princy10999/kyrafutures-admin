import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import Avatar from "../../../src/images/7309682.png";
import { Switch } from "@material-ui/core";
import { BsEye } from "react-icons/bs";

import { toAbsoluteUrl } from "../../_metronic/_helpers";
import ReactDOM from "react-dom";

const items = [...Array(33).keys()];

function Items({
  currentItems,
  viewHandleOpen,
  switchHandler,
  handleOpen,
  userFromApi,
  deleteUser,
}) {
  return (
    <div className="items">
      <Table responsive className="mt-3">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country Code</th>
            <th>Phone Number</th>
            <th>Referral Code</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userFromApi?.map((v) => {
            return (
              <tr>
                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  <img
                    src={v?.profilePic ? v?.profilePic : Avatar}
                    height={50}
                    width={50}
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  {v?.firstName || "-"}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  {v?.lastName || "-"}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  {v?.email || "-"}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  {v?.countryCode || "-"}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  {v?.phoneNumber || "-"}
                </td>

                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  {v?.referralCode || "-"}
                </td>

                <td
                  className="cursor-pointer"
                  onClick={() => viewHandleOpen(v?.uid)}
                >
                  <span
                  style={{fontSize:'11px', borderRadius:"5px"}}
                    href=""
                    className={`${
                      v?.isVerified
                        ? "bg-success p-1 text-white px-5"
                        : "bg-secondary p-1 px-5"
                    }`}
                  >
                    {v?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </td>

                <td className="d-flex align-items-center">
                  <a
                    title="Edit customer"
                    className="btn btn-icon btn-light btn-hover-primary btn-sm "
                    onClick={() => handleOpen(v)}
                  >
                    <span className="svg-icon svg-icon-md">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      />
                    </span>
                  </a>

                  <Button
                    disabled
                    // title="Edit customer"
                    className="btn btn-icon btn-light btn-hover-danger btn-sm ml-2"
                    // onClick={() => deleteUser(v?.uid)}
                  >
                    <span className="svg-icon svg-icon-md">
                      <BsEye />
                    </span>
                  </Button>

                  <div>
                    <Switch
                      checked={v?.isActive}
                      onChange={(e) => switchHandler(e.target.checked, v?.uid)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default function PaginatedItems({
  handlePageClick,
  itemsPerPage,
  viewHandleOpen,
  switchHandler,
  handleOpen,
  userFromApi,
  deleteUser,
}) {
  // console.log("itemparpage", itemsPerPage)
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //     console.log("event", event)
  //     // const newOffset = event.selected * itemsPerPage % items.length;
  //     // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
  //     // setItemOffset(newOffset);
  //     // console.log ("newOffset", newOffset)
  // };

  return (
    <>
      <Items
        currentItems={currentItems}
        viewHandleOpen={viewHandleOpen}
        switchHandler={switchHandler}
        handleOpen={handleOpen}
        userFromApi={userFromApi}
        deleteUser={deleteUser}
      />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
