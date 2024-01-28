import moment from 'moment';
import { Descriptions, ConfigProvider, Badge } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function StudentEntryShowing(props) {
    const score = (props.item) ? props.item[0].result : 'Select an event'
    const [seen, setSeen] = useState('Select an event')
    const [accept, setAccept] = useState('Select an event')
    const [fullMarks, setFullMarks] = useState((props.item) ? props.item[0].full_marks : 'Select an event')
    const [disabled, setDisable] = useState(false)

    useEffect(() => {
        setDisable(false)
        if (props.item) {
            if (props.item[0].seen_datetime !== "You're not seen yet") {
                setSeen(moment(props.item[0].seen_datetime).format('DD/MM/YYYY HH:mm:ss'))
            }
            else {
                setSeen(props.item[0].seen_datetime)
            }

            if (props.item[0].accept_datetime !== "You're not accept yet") {
                setAccept(moment(props.item[0].accept_datetime).format('DD/MM/YYYY HH:mm:ss'))
            }
            else {
                setAccept(props.item[0].accept_datetime)
            }
            if (props.item[0].full_marks) {
                if (score < parseInt(props.item[0].full_marks) / 2) {
                    setFullMarks('Bad')
                }
                else if (score == parseInt(props.item[0].full_marks) / 2) {
                    setFullMarks('Mid')
                }
                else if (score > parseInt(props.item[0].full_marks) / 2) {
                    setFullMarks('Excellent')
                }
            }
            else {
                setFullMarks("This event don't have criteria")
            }
        }
    }, [props.item])

    if (props.item) {
        props.unseen(props.item[0].seen_datetime, props.item[0].id);
    }

    const onDisable = () => {
        setDisable(true)
    }

    const items = [
        {
            label: 'Score',
            span: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 2,
                xxl: 2,
            },
            children: score,
        },
        {
            label: 'Result',
            span: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 2,
                xxl: 2,
            },
            children: fullMarks
            // <>
            //     <i className="bi bi-star-fill p-1"></i>
            //     <i className="bi bi-star-fill p-1"></i>
            //     <i className="bi bi-star-fill p-1"></i>
            //     <i className="bi bi-star-fill p-1"></i>
            //     <i className="bi bi-star-fill p-1"></i>
            // </>,
        },
        {
            label: 'Accept',
            span: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 2,
                xxl: 2,
            },

            children:
                <>
                    {accept}
                    {accept == "You're not accept yet" && (
                        <>
                            <hr />
                            <Button
                                size='sm'
                                onClick={() => { props.clicked(props.item[0].id); onDisable(); }}
                                disabled={disabled}
                                className='btn btn-dark ms-3'
                            >
                                Click to accept
                            </Button>
                        </>
                    )}
                </>
        },
        {
            label: 'Seen',
            span: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 2,
                xxl: 2,
            },
            children: seen,
        },
        {
            label: 'Status',
            children: <Badge status="processing" text="Avaliable" style={{ color: "#5cb85c" }} />,
        },
    ];
    return (
        <ConfigProvider
            theme={{
                components: {
                    Descriptions: {
                        colorText: 'rgba(255,255,255, 1)',
                        colorTextSecondary: 'rgba(255,255,255, 0.8)',
                        colorSplit: 'rgba(255,255,255, 0.8)',
                        labelBg: 'rgba(0, 255, 255, 0.1)'
                    },
                },
            }}
        >
            <Descriptions
                bordered
                column={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                items={items}
            />
        </ConfigProvider>
    )
};
