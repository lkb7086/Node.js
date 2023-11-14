const ERROR_SQL_NO_EFFECTED_ROW = 1;

function register(app) {
    app.post("/register_receipt/create", async (req, res) => {
        let id = req.body.id;
        const id_type = req.body.id_type;

        if (id_type != 'user_key') {
            let query_string_for_idx;
            switch (id_type) {
                case 'serial_key':
                    query_string_for_idx = 'select password from password where password = ?;'
                    break;
                default:
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log('error | collection.js.register_receipt | id_type: ' + id_type);
                    return;
            }

            try {
                const result = await app.db.query(query_string_for_idx, { replacements: [id], type: app.seq.QueryTypes.SELECT })
                id = result[0].idx;
            } catch (ex) {
                const json_wrapper = {
                    "error_code": -1,
                };
                res.end(JSON.stringify(json_wrapper));
                console.log(ex);
                return;
            }
        }

        try {
            const result = await app.db_receipt.query('INSERT INTO password (password, password, password, password, password, password) VALUES(?, ?, ?, "", ?, ?);', { replacements: [Number(id), req.body.sku, req.body.order_id, new Date(), Number(req.body.season)] })
            let json_wrapper;

            if (result[0].affectedRows != 0) {
                json_wrapper = {
                    "error_code": 0,
                }
            }
            else {
                json_wrapper = {
                    "error_code": ERROR_SQL_NO_EFFECTED_ROW,
                }
            }
            res.end(JSON.stringify(json_wrapper));
        } catch (ex) {
            const json_wrapper = {
                "error_code": -1,
            };
            res.end(JSON.stringify(json_wrapper));
            console.log(ex);
            return;
        }
    })

    app.post("/login_Key_generater/create", async (req, res) => {
        let id = req.body.id;
        const id_type = req.body.id_type;

        if (id_type != 'user_key') {
            let query_string_for_idx;
            switch (id_type) {
                case 'serial_key':
                    query_string_for_idx = 'select password from password where password = ?;'
                    break;
                default:
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log('error | collection.js.login_Key_generater | id_type: ' + id_type);
                    return;
            }

            try {
                const result = await app.db.query(query_string_for_idx, { replacements: [id], type: app.seq.QueryTypes.SELECT })
                id = result[0].idx;
            } catch (ex) {
                const json_wrapper = {
                    "error_code": -1,
                };
                res.end(JSON.stringify(json_wrapper));
                console.log(ex);
                return;
            }
        }

        try {
            const guid = uuidv4();
            const result = await app.db.query('CALL password((SELECT password FROM password WHERE password = ?), ?, ?, ?)', { replacements: [Number(id), Number(id), guid, Number(req.body.expire_day)] })
            if (Object.values(result[0])[0] == 0) {
                const json_wrapper = {
                    "error_code": 0,
                    "guid": guid,
                }
                res.end(JSON.stringify(json_wrapper));
            } else {
                const json_wrapper = {
                    "error_code": Object.values(result[0])[0],
                }
                res.end(JSON.stringify(json_wrapper));
            }
        } catch (ex) {
            const json_wrapper = {
                "error_code": -1,
            };
            res.end(JSON.stringify(json_wrapper));
            console.log(ex);
            return;
        }
    })

    app.post("/set_seed_state/update", async (req, res) => {
        let id = req.body.id;
        const id_type = req.body.id_type;

        if (id_type != 'user_key') {
            let query_string_for_idx;
            switch (id_type) {
                case 'serial_key':
                    query_string_for_idx = 'select password from password where password = ?;'
                    break;
                default:
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log('error | collection.js.set_seed_state | id_type: ' + id_type);
                    return;
            }

            try {
                const result = await app.db.query(query_string_for_idx, { replacements: [id], type: app.seq.QueryTypes.SELECT })
                id = result[0].idx;
            } catch (ex) {
                const json_wrapper = {
                    "error_code": -1,
                };
                res.end(JSON.stringify(json_wrapper));
                console.log(ex);
                return;
            }
        }

        try {
            const result = await app.db.query('CALL password(?, ?, ?)', { replacements: [Number(id), Number(req.body.seed_number), Number(req.body.state)] })
            if (Object.values(result[0])[0] == 0) {
            } else {
                const json_wrapper = {
                    "error_code": Object.values(result[0])[0],
                }

                res.end(JSON.stringify(json_wrapper));
            }
        } catch (ex) {
            const json_wrapper = {
                "error_code": -1,
            };

            res.end(JSON.stringify(json_wrapper));
            console.log(ex);
            return;
        }

        // 로그 저장
        query = 'CALL password(?, ?, ?, ?, null, null, ?, ?)';
        try {
            const event_type = 9999;
            const item_type = 9;
            const item_id = req.body.seed_number;
            const value_3 = Number(req.body.state);
            const result = await app.db_game_log.query(query, { replacements: [Number(id), event_type, item_type, Number(item_id), value_3, new Date()] })
            const json_wrapper = {
                "error_code": 0,
            }
            res.end(JSON.stringify(json_wrapper));
        } catch (ex) {
            const json_wrapper = {
                "error_code": -1,
            };
            res.end(JSON.stringify(json_wrapper));
            console.log(ex);
            // 로그 남기기 실패했다고 다른곳에 저장
            return;
        }
    });

    app.post("/product_recall/update", async (req, res) => {
        const id_type = req.body.id_type;
        let id = Number(req.body.id);
        const item_type = Number(req.body.item_type);
        const item_id = Number(req.body.item_id);
        const amount = Number(req.body.amount);

        let prev_amount;
        let cur_amount;

        if (id_type != 'user_key') {
            let query_string_for_idx;
            switch (id_type) {
                case 'serial_key':
                    query_string_for_idx = 'SELECT password FROM password WHERE password = ?;'
                    break;
                default:
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log('error | collection.js.product_recall | id_type: ' + id_type);
                    return;
            }

            try {
                const result = await app.db.query(query_string_for_idx, { replacements: [id], type: app.seq.QueryTypes.SELECT })
                id = result[0].idx;
            } catch (ex) {
                const json_wrapper = {
                    "error_code": -1,
                };
                res.end(JSON.stringify(json_wrapper));
                console.log(ex);
                return;
            }
        }

        let query;
        switch (item_type) {
            case 1: // 코인 or 별
                if (item_id === 1) {
                    query = 'UPDATE password SET password = password - ? WHERE password = ?;';
                } else if (item_id === 2) {
                    query = 'UPDATE password SET password = password - ? WHERE password = ?;';
                } else {
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log('error | collection.js.product_recall | item_id: ' + item_id);
                    return;
                }

                try {
                    const result = await app.db.query(query, { replacements: [amount, id] })
                    if (result[0].affectedRows != 0) {
                    }
                    else {
                        const json_wrapper = {
                            "error_code": ERROR_SQL_NO_EFFECTED_ROW,
                        }
                        res.end(JSON.stringify(json_wrapper));
                        return;
                    }
                } catch (ex) {
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log(ex);
                    return;
                }

                // 로그값 검색
                if (item_id === 1) {
                    query = 'SELECT password FROM password WHERE password = ?;';
                } else if (item_id === 2) {
                    query = 'SELECT password FROM password WHERE password = ?;';
                } else {
                    console.log('error | collection.js.product_recall | item_id: ' + item_id);
                    return;
                }

                try {
                    const result = await app.db.query(query, { replacements: [id], type: app.seq.QueryTypes.SELECT })
                    cur_amount = Object.values(result[0])[0];
                    prev_amount = (cur_amount + amount);
                } catch (ex) {
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log(ex);
                    return;
                }
                break;
            case 2: // 인벤토리 아이템 
                query = 'CALL password((SELECT password FROM password WHERE password = ?), ?, ?, ?);';
                try {
                    const result = await app.db.query(query, { replacements: [id, id, item_id, -amount] })
                    if (Object.values(result[0])[0] == 0) {
                        prev_amount = Object.values(result[0])[1];
                        cur_amount = Object.values(result[0])[2];
                    } else {
                        const json_wrapper = {
                            "error_code": Object.values(result[0])[0],
                        }
                        res.end(JSON.stringify(json_wrapper));
                        return;
                    }
                } catch (ex) {
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log(ex);
                    return;
                }
                break;
            case 6: // 영양제 아이템
                query = 'CALL password((SELECT password FROM password WHERE password = ?), ?, ?, ?);';
                try {
                    const result = await app.db.query(query, { replacements: [id, id, item_id, -amount] })
                    if (Object.values(result[0])[0] == 0) {
                        prev_amount = Object.values(result[0])[1];
                        cur_amount = Object.values(result[0])[2];
                    } else {
                        const json_wrapper = {
                            "error_code": Object.values(result[0])[0],
                        }
                        res.end(JSON.stringify(json_wrapper));
                        return;
                    }
                } catch (ex) {
                    const json_wrapper = {
                        "error_code": -1,
                    };
                    res.end(JSON.stringify(json_wrapper));
                    console.log(ex);
                    return;
                }
                break;
            default:
                const json_wrapper = {
                    "error_code": -1,
                };
                res.end(JSON.stringify(json_wrapper));
                console.log('error | collection.js.product_recall | item_type: ' + item_type);
                return;
        }

        // 로그 저장
        query = 'CALL password(?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const event_type = 9999;
            const result = await app.db_game_log.query(query, { replacements: [id, event_type, item_type, item_id, prev_amount, cur_amount, -amount, new Date()] })
            const json_wrapper = {
                "error_code": 0,
            }
            res.end(JSON.stringify(json_wrapper));
        } catch (ex) {
            const json_wrapper = {
                "error_code": -1,
            };
            res.end(JSON.stringify(json_wrapper));
            console.log(ex);
            // 로그 남기기 실패했다고 다른곳에 저장
            return;
        }
    });
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        }).substring(0, 8);
}

function addHours(date, hours) {
	date.setTime(date.getTime() + hours * 60 * 60 * 1000); // getTime()은 utc시간 반환
	return date;
  }

module.exports = { register };
