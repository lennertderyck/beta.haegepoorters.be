import { createActivity, getActiveEditions, getActivitiesByEdition, getActivitiesByEditionAndGroup, getActivityById, getAllActivities, getAllEditions, updateActivityById } from '../services/airtable';
import { default as api } from './server';

api.get('/editions', async (_, res) => {
    const data = await getAllEditions();    
    const f = await data.map((d) => ({
        id: d.id,
        ...d.fields
    }));
    res.send(f);
});

api.get('/editions/active', async (_, res) => {
    const data = await getActiveEditions();    
    const f = await data.map((d) => ({
        id: d.id,
        ...d.fields
    }));
    res.send(f);
});

api.get('/activities/all', async (_, res) => {
    const data = await getAllActivities();
    const f = await data.map((d) => ({
        id: d.id,
        ...d.fields
    }));
    res.send(f);
})

api.get('/activities', async (req, res) => {
    const edition = req.query.edition;
    const group = req.query.group;
    const data = await getActivitiesByEditionAndGroup(String(edition), String(group));
    const f = await data.map((d) => ({
        id: d.id,
        ...d.fields,
    }));
    res.send(f);
})

api.post('/activities', async (req, res) => {
    const data = await createActivity(String(req.query.group), String(req.query.edition), req.body);
    const record = data[0];
    
    res.send({
        id: record.id,
        ...record.fields,
    })
})


api.get('/activities/:id', async (req, res) => {
    const data = await getActivityById(req.params.id);
    const record = data[0];
    
    res.send({
        id: record.id,
        ...record.fields,
    })
})

api.patch('/activities/:id', async (req, res) => {
    const data = await updateActivityById(req.params.id, req.body);
    const record = data[0];
    
    res.send({
        id: record.id,
        ...record.fields,
    })
})

api.get('/timeline', async (req, res) => {
    const activeEditions = await getActiveEditions();
    const firstActiveEdition = await activeEditions[0];
    const requestedId = firstActiveEdition.fields.id;
    
    const data = await getActivitiesByEdition(req.query.edition || requestedId);
    const f = await data.map((d) => ({
        id: d.id,
        ...d.fields,
    }));
    res.send(f);
})

api.post('/profile/avatar', async (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

export default api;