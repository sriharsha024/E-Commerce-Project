package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.repository.AddressRepo;
import com.ecommerce.project.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl  implements AddressService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    AddressRepo addressRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public List<AddressDTO> getAllAddresses() {
        List<Address> addresses = addressRepo.findAll();
        List<AddressDTO> addressDTOS=addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
        return addressDTOS;
    }

    @Override
    public AddressDTO getAddressById(Long addressId) {
        Address address=addressRepo.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));
        AddressDTO addressDTO=modelMapper.map(address, AddressDTO.class);
        return addressDTO;
    }

    @Override
    public List<AddressDTO> getUserAddresses(User user) {
        List<Address> addresses = user.getAddresses();
        List<AddressDTO> addressDTOS=addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
        return addressDTOS;
    }


    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO, Address.class);

        List<Address> addressList=user.getAddresses();
        addressList.add(address);
        user.setAddresses(addressList);

        address.setUser(user);
        Address savedAddress = addressRepo.save(address);

        AddressDTO savedAddressDTO = modelMapper.map(savedAddress, AddressDTO.class);
        return savedAddressDTO;
    }

    @Override
    public AddressDTO updateAddressById(Long addressId, AddressDTO addressDTO) {
        Address addressFromDb=addressRepo.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));
        addressFromDb.setStreet(addressDTO.getStreet());
        addressFromDb.setBuildingName(addressDTO.getBuildingName());
        addressFromDb.setCity(addressDTO.getCity());
        addressFromDb.setCountry(addressDTO.getCountry());
        addressFromDb.setState(addressDTO.getState());
        addressFromDb.setPincode(addressDTO.getPincode());

        Address updatedAddress = addressRepo.save(addressFromDb);
        User user=addressFromDb.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId()==addressId);
        user.getAddresses().add(addressFromDb);
        userRepo.save(user);

        AddressDTO savedAddressDTO = modelMapper.map(updatedAddress, AddressDTO.class);
        return savedAddressDTO;
    }

    @Override
    public AddressDTO deleteAddressById(Long addressId) {
        Address savedaddress=addressRepo.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));

        User user=savedaddress.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId()==addressId);
        userRepo.save(user);

        AddressDTO addressDTO=modelMapper.map(savedaddress, AddressDTO.class);
        addressRepo.delete(savedaddress);

        return addressDTO;
    }


}
