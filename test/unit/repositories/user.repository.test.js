const { UserRepository } = require("../../../src/repositories");
const mockingoose = require("mockingoose");
const { User } = require("../../../src/models");
let { UserModelMock: { users, user } } = require("../../mocks");

describe("User repository tests", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    it("Should return a user by id", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");

        //Estamos testiando el Repository, con el metodo get y le pasamos un _user

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.get(_user._id);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
        //Nos retorna algo y validamos que sea el mismo objeto _user
        //Hay muchos mas metodos de jest para testear, aca utilizamos toMatchObject.
    });

    it("Should find a user by username", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getUserByUsername(_user.username);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a user collection", async () => {
        users = users.map(user => {
            delete user.password;
            return user;
        });

        mockingoose(User).toReturn(users, "find");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
    });

    it("Should update an especific user by id", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(_user, "findOneAndUpdate");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.update(user._id, {
            name: "Niver"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);

    });

    it("Should delete an especific user by id", async () => {
        mockingoose(User).toReturn(user, "findOneAndDelete");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.delete(user._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
});

