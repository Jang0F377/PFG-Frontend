import { Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
	PlusCircleIcon,
	ShieldCheckIcon,
	ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import {
	CheckCircleIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { BACKEND_ROUTES, INTERNAL_ROUTES } from "../../constants/routes";

interface ModalProps {
	open: boolean;
	handleClose: () => void;
	specificRecipient: string | undefined;
	authToken?: string;
	userEmail?: string;
}

export const SeshSendInviteModal = ({
	open,
	handleClose,
	specificRecipient,
	authToken,
	userEmail,
}: ModalProps) => {
	const [recipientsEmails, setRecipientsEmails] = useState<Array<string>>([]);
	const [recipientsIds, setRecipientsIds] = useState<Array<string>>([]);
	const [recipient, setRecipient] = useState(
		specificRecipient ? specificRecipient : ""
	);
	const [recipientAddError, setRecipientAddError] = useState<boolean>(false);
	const [dateError, setDateError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [hour, setHour] = useState(8);
	const [day, setDay] = useState<string>("today");
	const AM = "AM";
	const PM = "PM";
	const [morningOrEvening, setMorningOrEvening] = useState(AM);
	const [selected, setSelected] = useState("00");
	const [game, setGame] = useState("");
	const [seshCreatedSuccessfully, setSeshCreatedSuccessfully] = useState(false);
	const [seshCreatedError, setSeshCreatedError] = useState(false);
	const selectTime = (event: {
		currentTarget: { id: SetStateAction<string> };
	}) => {
		if (selected !== event.currentTarget.id) {
			setSelected(event.currentTarget.id);
		}
	};

	const handleAmOrPm = () => {
		if (morningOrEvening === AM) {
			setMorningOrEvening(PM);
		} else {
			setMorningOrEvening(AM);
		}
	};
	const onClickAddHour = () => {
		if (hour === 12) {
			setHour(1);
		} else {
			setHour(hour + 1);
		}
	};
	const onClickSubHour = () => {
		if (hour === 1) {
			setHour(12);
		} else {
			setHour(hour - 1);
		}
	};

	// Helper func to handle validation errors when adding recipients
	const handleValidationErrors = (message: string): void => {
		setErrorMessage(message);
		setRecipientAddError(true);
	};

	// Makes an api call that returns false if not found
	// Otherwise returns the users _id and
	// we add  it to the recipientIds array
	const handleAddRecipient = async (email: string): Promise<boolean> => {
		/**
		 * Local Validation to handle
		 * 1. cannot add self
		 * 2. cannot add duplicate email
		 */
		const verifyNotAdded: boolean = recipientsEmails.includes(email);
		if (userEmail === email) {
			handleValidationErrors("Not allowed to add your own email!");
			return false;
		} else if (verifyNotAdded) {
			handleValidationErrors(
				"This email is already included in the recipients."
			);
			return false;
		}

		// api call
		const validateRecipientResponse = await fetch(
			`${BACKEND_ROUTES.VALIDATE_RECIPIENTS}/${email}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json", token: authToken! },
			}
		);
		const answer = await validateRecipientResponse.json();

		if (!validateRecipientResponse.ok) {
			handleValidationErrors(answer?.message);
			return false;
		}

		if (!answer) {
			handleValidationErrors(
				"Could not validate recipient, please check spelling and try again."
			);
			return false;
		}

		setRecipientsEmails((previous) => [...previous, email]);
		setRecipientsIds((previous) => [...previous, answer]);
		setRecipient("");
		return true;
	};

	const handleResetState = () => {
		setRecipientsIds([]);
		setRecipientsEmails([]);
		setGame("");
		setDay("today");
		setRecipient(specificRecipient ? specificRecipient : "");
		setSeshCreatedError(false);
		setSeshCreatedSuccessfully(false);
		window.location.reload();
		// handleClose();
	};

	// Api call to handle sesh creation
	const handleCreateSesh = async () => {
		/**
		 * Local validation
		 */
		if (day !== "today" && day !== "tomorrow") {
			var dateRegEx = /^\d{1,2}[/]\d{1,2}[/]\d{2,4}$/;
			const properDate = day.match(dateRegEx);
			const year = day.split("/")[2];
			if (!properDate) {
				setErrorMessage(
					"Either use 'today' or 'tomorrow' or put in date format - MM/DD/YYYY"
				);
				setDateError(true);
				return;
			} else if (year !== "2024" && year !== "24") {
				setErrorMessage(
					"For the time being the year must end as either '20' or '2024'"
				);
				setDateError(true);
				return;
			}
		}

		// prepare the body
		const time = `${hour}:${selected}${morningOrEvening}`;
		const body = JSON.stringify({
			game,
			proposedTime: time,
			proposedDay: day,
			recipients: recipientsIds,
		});
		const createSeshCall = await fetch(BACKEND_ROUTES.CREATE_SESH_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json", token: authToken! },
			body,
		});

		if (!createSeshCall.ok) {
			// handleResetState();
			setSeshCreatedError(true);
		}

		setSeshCreatedSuccessfully(true);
		// handleResetState();
	};

	// Hook to timeout the error
	useEffect(() => {
		if (recipientAddError) {
			setTimeout(() => {
				setRecipientAddError(false);
				setErrorMessage(null);
			}, 8000);
		}
		if (dateError) {
			setTimeout(() => {
				setDateError(false);
				setErrorMessage(null);
			}, 5000);
		}
		return () => {};
	}, [recipientAddError, dateError]);

	return (
		<>
			{seshCreatedSuccessfully || seshCreatedError ? (
				<>
					<Transition.Root show={open} as={Fragment}>
						<Dialog as="div" className="relative z-30" onClose={() => {}}>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
							</Transition.Child>

							<div className="fixed inset-0 z-40 overflow-y-auto">
								<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
										enterTo="opacity-100 translate-y-0 sm:scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 translate-y-0 sm:scale-100"
										leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									>
										<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
											<div className="z-20   mx-1 flex-col rounded-lg md:mx-auto  lg:relative lg:w-[490px] ">
												<section className="space-y-6 rounded-t-lg bg-neon-blue-100 py-7 px-4 sm:px-6  lg:py-6">
													<div>
														{seshCreatedSuccessfully ? (
															<h3 className="text-lg text-center font-medium leading-6 text-green-700">
																Sesh sent Successfully
															</h3>
														) : (
															<h3 className="text-lg text-center font-medium leading-6 text-green-700">
																Error creating Sesh
															</h3>
														)}
													</div>
												</section>
												<section className="space-y-4 bg-neon-blue-100 px-4 pb-5 sm:px-6">
													{seshCreatedSuccessfully ? (
														<ShieldCheckIcon
															className="md:w-40 mx-auto rounded-full bg-green-700 animate-custom-spin"
															color="black"
														/>
													) : (
														<ShieldExclamationIcon
															className="md:w-40 mx-auto bg-red-700 rounded-full animate-custom-spin "
															color="black"
														/>
													)}
												</section>
												<hr className="w-full border-neon-blue-700" />
												<section className="flex items-center justify-end space-x-6 rounded-b-md bg-neon-blue-100 px-4 py-7 sm:px-6 lg:py-6">
													<button
														onClick={() => handleResetState()}
														className="inline-block rounded-md bg-red-600 px-2 py-2.5 text-neon-blue-50 hover:bg-red-800 "
													>
														Close
													</button>
												</section>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition.Root>
				</>
			) : (
				<Transition.Root show={open} as={Fragment}>
					<Dialog as="div" className="relative z-30" onClose={() => {}}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed inset-0 z-40 overflow-y-auto">
							<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									enterTo="opacity-100 translate-y-0 sm:scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 translate-y-0 sm:scale-100"
									leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								>
									<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
										<div className="z-20   mx-1 flex-col rounded-lg md:mx-auto  lg:relative lg:w-[490px] ">
											<section className="space-y-6 rounded-t-lg bg-neon-blue-100 py-7 px-4 sm:px-6  lg:py-6">
												<div>
													<h3 className="text-base font-medium leading-6 text-neon-blue-900">
														Send a Sesh Invite.
													</h3>
													<p className="mt-0.5 text-xs text-neon-blue-tone-200">
														Add recipient/s and choose the proposed game and
														time.
													</p>
												</div>
												<div>
													<label
														htmlFor="recipient"
														className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
													>
														Recipient/s
													</label>
													{recipientsEmails?.length ? (
														<ul className="text-center md:text-left">
															{recipientsEmails.map((email) => (
																<div
																	key={email}
																	className="flex flex-row md:p-0.5"
																>
																	<CheckCircleIcon className="h-4 w-4 text-green-600" />
																	<li className="p-0.5 text-xs text-neon-blue-900">
																		{email}
																	</li>
																</div>
															))}
														</ul>
													) : (
														<div />
													)}
													<div className="flex flex-row items-center space-x-3">
														<input
															type="text"
															name="recipient"
															id="recipient"
															autoComplete="email"
															value={recipient}
															onChange={(e) => setRecipient(e.target.value)}
															className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														/>
														{recipient ? (
															<PlusCircleIcon
																onClick={() => {
																	handleAddRecipient(recipient);
																}}
																className={clsx(
																	"flex h-7 w-7 cursor-pointer justify-end text-right",
																	recipientAddError
																		? "text-red-700 animate-bounce"
																		: ""
																)}
															/>
														) : null}
													</div>
													{recipientAddError ? (
														<div>
															<p className="text-red-700 text-left text-xs">
																{errorMessage}
															</p>
														</div>
													) : (
														<div />
													)}
												</div>
											</section>
											<section className="space-y-4 bg-neon-blue-100 px-4 pb-5 sm:px-6">
												<div>
													<label
														htmlFor="game"
														className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
													>
														What game do you want to suggest?
													</label>
													<input
														type="text"
														name="game"
														id="game"
														value={game}
														onChange={(e) => setGame(e.target.value)}
														autoComplete="text"
														className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
												<div>
													<label
														htmlFor="game"
														className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
													>
														When?
													</label>
													<p className=" text-xs text-neon-blue-tone-200">
														You can say today, tomorrow, or date format eg.{" "}
														{new Date().toLocaleDateString()}
													</p>
													<input
														type="text"
														name="game"
														id="game"
														value={day}
														onChange={(e) => setDay(e.target.value)}
														autoComplete="text"
														className="block p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
													{dateError ? (
														<div>
															<p className="text-red-700 text-left text-xs">
																{errorMessage}
															</p>
														</div>
													) : (
														<div />
													)}
												</div>
												<div>
													<label
														htmlFor="time"
														className="block text-sm font-medium text-neon-blue-900"
													>
														What time for the Sesh?
													</label>
													<div className="flex flex-col items-center justify-evenly space-y-3 pt-1 md:flex-row md:space-y-0">
														<div className="mt-1 flex flex-row items-center rounded-md bg-white px-4 py-2 md:mt-0 ">
															<ChevronLeftIcon
																className="w-6 cursor-pointer pr-1"
																onClick={onClickSubHour}
															/>
															<h1 className=" mx-1 text-center">{hour}</h1>
															<ChevronRightIcon
																className="w-6 cursor-pointer pl-1"
																onClick={onClickAddHour}
															/>
														</div>
														<div className="flex flex-col ">
															<div className="flex flex-row  rounded-md bg-white shadow-sm">
																<button
																	onClick={selectTime}
																	id="00"
																	className={clsx(
																		"relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium",
																		selected === "00"
																			? "border border-white bg-neon-blue-700 text-neon-blue-50 "
																			: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
																	)}
																>
																	00
																</button>
																<button
																	onClick={selectTime}
																	id="15"
																	className={clsx(
																		"relative inline-flex items-center  px-4 py-2 text-sm font-medium",
																		selected === "15"
																			? "border border-white bg-neon-blue-700 text-neon-blue-50 "
																			: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
																	)}
																>
																	15
																</button>
																<button
																	onClick={selectTime}
																	id="30"
																	className={clsx(
																		"relative inline-flex items-center  px-4 py-2 text-sm font-medium",
																		selected === "30"
																			? "border border-white bg-neon-blue-700 text-neon-blue-50 "
																			: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
																	)}
																>
																	30
																</button>
																<button
																	onClick={selectTime}
																	id="45"
																	className={clsx(
																		"relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
																		selected === "45"
																			? "border border-white bg-neon-blue-700 text-neon-blue-50 "
																			: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
																	)}
																>
																	45
																</button>
															</div>
														</div>
														<span className="flex  rounded-md shadow-sm">
															<button
																onClick={handleAmOrPm}
																id={AM}
																className={clsx(
																	"relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium ",
																	morningOrEvening === AM
																		? "border border-white bg-neon-blue-700 text-neon-blue-50 "
																		: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
																)}
															>
																{AM}
															</button>
															<button
																onClick={handleAmOrPm}
																id={PM}
																className={clsx(
																	"relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
																	morningOrEvening === PM
																		? "border border-white bg-neon-blue-700 text-neon-blue-50 "
																		: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50  hover:ring-1 hover:ring-neon-blue-500"
																)}
															>
																{PM}
															</button>
														</span>
													</div>
												</div>
											</section>
											<hr className="w-full border-neon-blue-700" />
											<section className="flex items-center justify-end space-x-6 rounded-b-md bg-neon-blue-100 px-4 py-7 sm:px-6 lg:py-6">
												<button
													onClick={() => handleResetState()}
													className="inline-block rounded-md bg-red-600 px-2 py-2.5 text-neon-blue-50 hover:bg-red-800 "
												>
													Cancel
												</button>
												<button
													disabled={
														recipientsEmails?.length === undefined ||
														recipientsEmails?.length <= 0 ||
														!game
													}
													onClick={handleCreateSesh}
													className="inline-block items-center rounded-md bg-neon-blue-600 px-2 py-2.5 text-neon-blue-50 hover:bg-neon-blue-800 disabled:pointer-events-none disabled:bg-gray-400 "
												>
													Send Sesh Invite
												</button>
											</section>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			)}
		</>
	);
};

export const SeshReceiveInviteModal = ({ open }: ModalProps) => {};

/*export const WelcomeModal = ({
  open,
  handleClose,
  specificRecipient,
}: ModalProps) => {
  const [game1, setGame1] = useState("");
  const [game2, setGame2] = useState("");
  const [game3, setGame3] = useState("");
  const [uid, setUid] = useState("");
  const [clickOut, setClickOut] = useState(false);

  const handleSubmit = async () => {
    console.log(uid);
    await fetch("/api/myTop3", {
      method: "POST",
      body: JSON.stringify({
        game1: game1,
        game2: game2,
        game3: game3,
        _id: uid,
      }),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        setClickOut(false);
        handleClose();
      } else {
        alert(
          "Sorry, something went wrong. Please visit the Account page to input this "
        );
        setClickOut(false);
        handleClose();
      }
    });
  };
  useEffect(() => {
    if (specificRecipient) {
      setUid(specificRecipient);
    }
  }, [specificRecipient]);

  const ClickOut = () => {
    return (
      <>
        <p className="text-xs font-medium text-red-600">
          Please fill in your Top 3!
        </p>
        <p className="text-[0.60rem] font-medium text-red-600">
          you can change this later
        </p>
      </>
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => setClickOut(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-xl sm:p-6">
                <div className="flex items-center justify-between space-y-1 ">
                  <div className="flex flex-col">
                    <label className="ml-1 block  font-medium text-neon-blue-900">
                      My Top 3 Games:
                    </label>
                    {clickOut && <ClickOut />}
                    <div className="flex flex-col space-y-3 ">
                      <div className="flex flex-col items-center justify-evenly space-x-0 space-y-1 md:flex-row md:space-x-3 md:space-y-0">
                        <label className=" block  text-sm font-medium text-neon-blue-900">
                          1.
                        </label>
                        <input
                          type={"text"}
                          value={game1}
                          autoComplete="text"
                          onChange={(e) => setGame1(e.target.value)}
                          className="rounded"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-evenly space-x-0 space-y-1 md:flex-row md:space-x-3 md:space-y-0">
                        <label className=" block  text-sm font-medium text-neon-blue-900">
                          2.
                        </label>

                        <input
                          type={"text"}
                          autoComplete="text"
                          value={game2}
                          onChange={(e) => setGame2(e.target.value)}
                          className="rounded"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-evenly space-x-0 space-y-1 md:flex-row md:space-x-3 md:space-y-0">
                        <label className=" block  text-sm font-medium text-neon-blue-900">
                          3.
                        </label>

                        <input
                          type={"text"}
                          value={game3}
                          autoComplete="text"
                          onChange={(e) => setGame3(e.target.value)}
                          className=" rounded"
                        />
                      </div>
                      <button
                        type={"button"}
                        disabled={!game1 || !game2 || !game3}
                        onClick={handleSubmit}
                        className="my-0.5 mt-2 inline-block rounded-lg bg-neon-blue-600 px-1.5 py-2 text-sm font-medium text-neon-blue-50 hover:bg-neon-blue-800 disabled:bg-gray-400"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};*/
